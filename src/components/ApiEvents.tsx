import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRow, IonSpinner, IonTabButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ApiEvents.css';
import { SomeEventsData, ApiResponseEvents } from './EventInterface'


const ApiComponent: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

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
        <IonContent>
            {data.length > 0 ? (
                <IonGrid>
                    {data.map((event: SomeEventsData) => (
                        <IonCard key={event.id} button={true} href={'/event/' + event.id}>
                            <IonCardHeader>
                                <IonCardTitle>{event.title}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='auto'>
                                            <IonGrid className='date-grid'>
                                                <IonRow className="ion-text-uppercase">{new Date(event.date + 'Z').toLocaleString(i18n.language, { month: 'short' })}</IonRow>
                                                <IonRow style={{ fontSize: '30px' }}>{new Date(event.date + 'Z').toLocaleString(i18n.language, { day: '2-digit' })}</IonRow>
                                                <IonRow>{new Date(event.date + 'Z').toLocaleString(i18n.language, { weekday: 'long' })}</IonRow>
                                            </IonGrid>
                                        </IonCol>

                                        <IonCol size='auto'>
                                            <div style={{ backgroundColor: event.associationColor, width: '3px', height: '100%' }} />
                                        </IonCol>

                                        <IonCol>
                                            <IonGrid className='infos-grid' style={{ color: 'black' }}>
                                                <IonRow className='info'>
                                                    <IonLabel style={{ color: event.associationColor }}>{event.associationName}</IonLabel>
                                                </IonRow>

                                                <IonRow className='info'>
                                                    <IonLabel>
                                                        📍&nbsp;
                                                        {event.place}
                                                    </IonLabel>
                                                </IonRow>

                                                <IonRow className='info'>
                                                    <IonLabel>
                                                        🕓&nbsp;
                                                        {new Date(event.date + 'Z').toLocaleString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                                                    </IonLabel>
                                                </IonRow>
                                            </IonGrid>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>


                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonGrid>
            ) : (
                <IonLabel>No data available</IonLabel>
            )}
        </IonContent>
    );
};

export default ApiComponent;
