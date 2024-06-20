import React from 'react'
import { useTranslation } from 'react-i18next';
import { SomeEventsData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import useEventData from '../../Tools/EventApiCall';

const FuturEventsComponent: React.FC<{ apiHref: string }> = ({ apiHref }) => {
    // Use to translate the page
    const { t } = useTranslation();

    const { data, loading } = useEventData(apiHref);

    if (loading) {
        return (
            // To center the loading circle
            <IonTabButton disabled>
                <IonSpinner name='circular' />
            </IonTabButton>
        );
    }

    /**
     * Method to return the filtered data for the past events
     * @returns return the filtered data for the past events
     */
    const getFilteredEvents = () => {
        const currentDate = new Date();
        return data.filter(event => new Date(event.date + 'Z') < currentDate);
    };

    return (
        <>
            {getFilteredEvents().length > 0 ? (
                <IonGrid>
                    {getFilteredEvents().map((event: SomeEventsData) => (
                        <EventCardComponent key={`past-${event.id}`} event={event} />
                    ))}
                </IonGrid>
            ) : (
                <div className='ion-padding all-screen-swipe'>
                    <h1 className='title'>{t('events.filter.past.message.title')}</h1>
                    <div className='justify-text'><IonLabel>{t('events.filter.past.message.text')}</IonLabel></div>
                </div>
            )
            }
        </>
    )
}

export default FuturEventsComponent