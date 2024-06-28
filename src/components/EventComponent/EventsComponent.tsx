import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { AssosData, EventData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import { getEventsByWeek, getFilteredEvents, getWeekName } from '../../Tools/EventTools';
import Api from '../../Tools/Api';


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

    const filteredEvents = getFilteredEvents(eventsData, filter);

    const eventByWeek = getEventsByWeek(filteredEvents);

    return (
        <>
            {Object.keys(eventByWeek).length > 0 ? (
                <IonGrid>
                    {Object.keys(eventByWeek).map((weekKey, index) => {
                        const test = getWeekName(weekKey);
                        return (
                            <div key={index} className='title'>
                                <h2>{t(test[0]) + test[1]}</h2>
                                {eventByWeek[weekKey].map((event: EventData) => (
                                    <EventCardComponent key={`past-${event.id}`} event={event} asso={getAssoById(event.asso_id)} />
                                ))}
                            </div>
                        );
                    })}
                </IonGrid>
            ) : (
                <div className='ion-padding all-screen-swipe'>
                    <h1 className='title'>{t('events.filter.' + filter + '.message.title')}</h1>
                    <div className='justify-text'><IonLabel>{t('events.filter.' + filter + '.message.text')}</IonLabel></div>
                </div>
            )
            }
        </>
    )
}

export default EventsComponent