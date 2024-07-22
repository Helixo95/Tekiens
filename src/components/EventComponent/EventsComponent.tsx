import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AssosData, EventData } from '../../Tools/Interfaces/EventAndAssoInterface';
import { IonContent, IonIcon, IonLabel, IonRefresher, IonRefresherContent, IonSpinner, IonTabButton, RefresherEventDetail } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import { getEventsByWeek, getFilteredEvents, getWeekName } from '../../Tools/EventsTools';
import Api from '../../Tools/Api';
import { help, searchOutline } from 'ionicons/icons';

const EventsComponent: React.FC<{ filter: string, assoID?: string }> = ({ filter, assoID = '' }) => {
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

    const eventByWeek = getEventsByWeek(filteredEvents);

    // Function if the user want to reload the page
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData().then(() => event.detail.complete());
    }

    return (
        <div>
            <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
                <IonRefresherContent />
            </IonRefresher>

            {Object.keys(eventByWeek).length > 0 ? (
                Object.keys(eventByWeek).map((weekKey, index) => {
                    const weekString = getWeekName(weekKey);
                    return (
                        <div key={index}>
                            <div className='title center-screen-text'>
                                <h2>{t(weekString[0]) + weekString[1]}</h2>
                            </div>
                            <div className='event-card-container'>
                                {eventByWeek[weekKey].map((event: EventData) => (
                                    <EventCardComponent event={event} asso={getAssoById(event.asso_id)} key={event.id} />
                                ))}
                            </div>
                        </div>

                    );
                })
            ) : (
                <div className='ion-padding all-screen-swipe'>
                    <h1 className='title'>{t('events.filter.' + filter + '.message.title')}</h1>
                    <div className='justify-text'><IonLabel>{t('events.filter.' + filter + '.message.text')}</IonLabel></div>
                </div>
            )
            }
        </div>
    )
}

export default EventsComponent