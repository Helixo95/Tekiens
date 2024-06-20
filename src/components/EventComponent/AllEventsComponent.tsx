import React from 'react'
import { useTranslation } from 'react-i18next';
import { SomeEventsData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import useEventData from '../../Tools/EventApiCall';

import '../../theme/Event/EventsComponent.css';

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

    return (
        <>
            {data.length > 0 ? (
                <IonGrid>
                    {data.map((event: SomeEventsData) => (
                        <EventCardComponent key={`all-${event.id}`} event={event} />
                    ))}
                </IonGrid>
            ) : (
                <div className='ion-padding all-screen-swipe'>
                    <h1 className='title'>{t('events.filter.all.message.title')}</h1>
                    <div className='justify-text'><IonLabel>{t('events.filter.all.message.text')}</IonLabel></div>
                </div>
            )
            }
        </>
    )
}

export default FuturEventsComponent