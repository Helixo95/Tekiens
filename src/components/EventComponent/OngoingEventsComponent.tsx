import React from 'react'
import { useTranslation } from 'react-i18next';
import { SomeEventsData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import useEventData from '../../Tools/EventApiCall';
import { getEventsByWeek, getWeekName } from '../../Tools/EventTools';


const OngoingEventsComponent: React.FC<{ apiHref: string }> = ({ apiHref }) => {
    // Use to translate the page
    const { t } = useTranslation();

    const { data, loading } = useEventData(apiHref);

    /**
     * Method to return the filtered data for the ongoing events
     * @returns return the filtered data for the ongoing events
     */
    const getFilteredEvents = () => {
        const currentDate = new Date();
        return data.filter(event => {
            const eventDate = new Date(event.date + 'Z');
            return eventDate.toDateString() === currentDate.toDateString();
        });
    };

    const filteredEvents = getFilteredEvents();

    const eventByWeek = getEventsByWeek(filteredEvents);

    return (
        <>
            {Object.keys(eventByWeek).length > 0 ? (
                <IonGrid>
                    {Object.keys(eventByWeek).map((weekKey, index) => (
                        <div key={index} className='title'>
                            <h2>{getWeekName(weekKey)}</h2>
                            {eventByWeek[weekKey].map((event: SomeEventsData) => (
                                <EventCardComponent key={`past-${event.id}`} event={event} />
                            ))}
                        </div>

                    ))}
                </IonGrid>
            ) : (
                <div className='ion-padding all-screen-swipe'>
                    <h1 className='title'>{t('events.filter.ongoing.message.title')}</h1>
                    <div className='justify-text'><IonLabel>{t('events.filter.ongoing.message.text')}</IonLabel></div>
                </div>
            )
            }
        </>
    )
}

export default OngoingEventsComponent