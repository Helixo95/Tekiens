import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ApiResponseEvents, SomeEventsData } from '../../Tools/Interfaces/EventInterface';
import { IonGrid, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import EventCardComponent from './EventCardComponent';

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

    return (
        <>
            {data.length > 0 ? (
                <IonGrid>
                    {data.map((event: SomeEventsData) => (
                        <EventCardComponent key={`all-${event.id}`} event={event} />
                    ))}
                </IonGrid>
            ) : (
                <div className='ion-padding'>
                    <h1 className='title'>{t('events.filter.all.message.title')}</h1>
                    <div className='justify-text'><IonLabel>{t('events.filter.all.message.text')}</IonLabel></div>
                </div>
            )
            }
        </>
    )
}

export default FuturEventsComponent