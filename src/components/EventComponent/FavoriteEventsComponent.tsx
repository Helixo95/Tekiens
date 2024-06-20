import React from 'react'
import { useTranslation } from 'react-i18next';
import { SomeEventsData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import '../../theme/Event/EventsComponent.css';
import useEventData from '../../Tools/EventApiCall';

const FuturEventsComponent: React.FC = () => {
    // Use to translate the page
    const { t } = useTranslation();

    const { data, loading } = useEventData("events");

    if (loading) {
        return (
            // To center the loading circle
            <IonTabButton disabled>
                <IonSpinner name='circular' />
            </IonTabButton>
        );
    }

    /**
     * Method to return the filtered data for the favorite events
     * @returns return the filtered data for the favorite events
     */
    const getFilteredEvents = () => {
        const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
        return data.filter(event => savedEvents.includes(event.id));
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
                    <h1 className='title'>{t('favorite.filter.events.message.title')}</h1>
                    <div className='justify-text'><IonLabel>{t('favorite.filter.events.message.text')}</IonLabel></div>
                </div>
            )
            }
        </>
    )
}

export default FuturEventsComponent