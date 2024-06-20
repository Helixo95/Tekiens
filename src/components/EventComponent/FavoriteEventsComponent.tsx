import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ApiResponseEvents, SomeEventsData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

import '../../theme/Event/EventsComponent.css';

const FuturEventsComponent: React.FC = () => {
    // Use to translate the page
    const { t } = useTranslation();

    const [data, setData] = useState<SomeEventsData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://tekiens.net/api/events');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result: ApiResponseEvents = await response.json();

                const eventsWithAssociations: SomeEventsData[] = await Promise.all(result.data.map(async (event) => {
                    const associationResponse = await fetch(`https://tekiens.net/api/assos/${event.asso_id}`);
                    if (!associationResponse.ok) {
                        throw new Error(`Failed to fetch association ${event.asso_id}`);
                    }
                    const associationResult = await associationResponse.json();
                    return {
                        ...event,
                        associationName: associationResult.data.names[0], // Use the first name (assuming it's primary)
                        associationColor: associationResult.data.color,
                    };
                }));

                setData(eventsWithAssociations.reverse());

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
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