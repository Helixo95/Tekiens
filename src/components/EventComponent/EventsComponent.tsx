import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AssosData, EventData } from '../../Tools/Interfaces/EventAndAssoInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import { getEventsByWeek, getFilteredEvents, getWeekName } from '../../Tools/EventsTools';
import Api from '../../Tools/Api';
import '../../theme/Event/EventsComponent.css'
import { key } from 'ionicons/icons';


const EventsComponent: React.FC<{ filter: string, assoID?: string }> = ({ filter, assoID = '' }) => {
    // Use for the translation
    const { t } = useTranslation();

    const [eventsData, setEventData] = useState<EventData[]>([]);
    const [assosData, setAssosData] = useState<AssosData[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

        fetchData();
    }, []);

    if (loading) {
        return (
            // To center the loading circle
            <IonTabButton disabled>
                <IonSpinner name='circular' />
            </IonTabButton>
        );
    }

    const getAssoById = (id: string) => {
        return assosData.find(asso => asso.id === id);
    }

    const filteredEvents = getFilteredEvents(eventsData, assosData, filter);

    const eventByWeek = getEventsByWeek(filteredEvents);

    return (
        <div>
            {Object.keys(eventByWeek).length > 0 ? (
                Object.keys(eventByWeek).map((weekKey, index) => {
                    const weekString = getWeekName(weekKey);
                    return (
                        <div key={index} className='title'>
                            <h2>{t(weekString[0]) + weekString[1]}</h2>
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