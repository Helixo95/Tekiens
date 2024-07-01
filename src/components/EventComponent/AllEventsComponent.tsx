import React from 'react'
import { useTranslation } from 'react-i18next';
import { SomeEventsData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import useEventData from '../../Tools/EventApiCall';
import { getEventsByWeek, getWeekName } from '../../Tools/EventTools';


const AllEventsComponent: React.FC<{ apiHref: string }> = ({ apiHref }) => {
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

    const eventByWeek = getEventsByWeek(data);

    return (
        <>
            {Object.keys(eventByWeek).length > 0 ? (
                <IonGrid>
                    {Object.keys(eventByWeek).map((weekKey, index) => {
                        const test = getWeekName(weekKey);
                        return (
                            <div key={index} className='title'>
                                <h2>{t(test[0]) + test[1]}</h2>
                                {eventByWeek[weekKey].map((event: SomeEventsData) => (
                                    <EventCardComponent key={`past-${event.id}`} event={event} />
                                ))}
                            </div>
                        );
                    })}
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

export default AllEventsComponent