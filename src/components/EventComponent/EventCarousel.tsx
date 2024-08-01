import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AssosData, EventData } from '../../Tools/Interfaces/EventAndAssoInterface';
import { IonContent, IonIcon, IonLabel, IonPage, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import { getFilteredEvents } from '../../Tools/EventsTools';
import Api from '../../Tools/Api';
import { help, searchOutline } from 'ionicons/icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

import '../../theme/Event/EventCarousel.css'

const EventCarousel: React.FC<{ filter: string, assoID?: string }> = ({ filter, assoID = '' }) => {
    // Used to translate the page
    const { t } = useTranslation();

    const [eventsData, setEventData] = useState<EventData[]>([]);
    const [assosData, setAssosData] = useState<AssosData[]>([]);

    const [loading, setLoading] = useState(true);

    // We get the events and their asso
    const fetchData = async () => {
        try {
            // If we want a specific association we just get the association event
            if (assoID) {
                const eventsData = await Api.assos.getEvents(assoID);
                setEventData(eventsData.reverse());
            }
            else {
                const eventsData = await Api.event.get();
                setEventData(eventsData.reverse());
            }

            const assosData = await Api.assos.get();
            setAssosData(assosData);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Loading appears while waiting for data
    if (loading) {
        return (
            <>
                <IonContent>
                    <IonTabButton disabled>
                        <IonSpinner name='circular' />
                    </IonTabButton>
                </IonContent>
            </>
        );
    }

    // We check if we have the data we want
    if (!eventsData) {
        return (
            <>
                <IonContent className="ion-padding">
                    <div className="center-screen-text">
                        <IonLabel style={{ "marginBottom": "25%" }}>Aucune information n'a été trouvé</IonLabel>
                        <div>
                            <IonIcon size="large" icon={searchOutline} /> <IonIcon size="large" icon={help} />
                        </div>
                    </div>
                </IonContent>
            </>
        );
    }

    const getAssoById = (id: string) => {
        return assosData.find(asso => asso.id === id);
    }

    const filteredEvents = getFilteredEvents(eventsData, assosData, filter);

    return (
        <>
            {filteredEvents.length > 0 ? (
                <Swiper className='swiper-carousel' loop={filteredEvents.length > 1 ? true : false}>
                    {filteredEvents.map((event) => {
                        return (
                            <SwiperSlide key={event.id}>
                                <EventCardComponent event={event} asso={getAssoById(event.asso_id)} key={event.id} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )
                : (
                    <div className='ion-padding'>
                        <h1 className='title'>{t('events.filter.' + filter + '.message.title')}</h1>
                        <div className='justify-text'><IonLabel>{t('events.filter.' + filter + '.message.text')}</IonLabel></div>
                    </div>
                )
            }
        </>
    )
}

export default EventCarousel