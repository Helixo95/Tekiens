import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow, IonSpinner, IonTabButton, IonText } from '@ionic/react'
import { useParams } from 'react-router'
import { ApiResponseEvent, AllEventsData } from '../../Tools/Interfaces/EventInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails .css'

const EventDetails: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

    const { id } = useParams<{ id: string }>();

    const [eventData, setEventData] = useState<AllEventsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the event data
                const eventResponse = await fetch(`https://tekiens.net/api/events/${id}`);
                if (!eventResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const eventResult: ApiResponseEvent = await eventResponse.json();
                const event = eventResult.data;

                // Fetch the association data
                const associationResponse = await fetch(`https://tekiens.net/api/assos/${event.asso_id}`);
                if (!associationResponse.ok) {
                    throw new Error(`Failed to fetch association ${event.asso_id}`);
                }

                const associationResult = await associationResponse.json();

                // Combine the event data with association details
                const eventWithAssociation = {
                    ...event,
                    associationName: associationResult.data.names[0], // Use the first name (assuming it's primary)
                    associationColor: associationResult.data.color,
                };

                setEventData(eventWithAssociation);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <IonTabButton disabled>
                <IonSpinner name='circular' />
            </IonTabButton>
        );
    }

    if (!eventData) {
        return (
            <IonContent>
                <IonLabel>No event data found</IonLabel>
            </IonContent>
        );
    }

    return (
        <IonPage>
            <HeaderTitleBack back="/app/événements">{t('evenement.title')}</HeaderTitleBack>
            <IonContent className='ion-padding'>
                <IonGrid>
                    <IonRow>
                        <IonCol size='auto'>
                            <IonLabel>{eventData.title}</IonLabel>
                            <IonRow>
                                <IonCol>
                                    <IonRow className='info'>
                                        <IonLabel style={{ color: eventData.associationColor }}>{eventData.associationName}</IonLabel>
                                    </IonRow>

                                    <IonRow className='info'>
                                        <IonLabel>
                                            📍&nbsp;
                                            {eventData.place}
                                        </IonLabel>
                                    </IonRow>

                                    <IonRow className='info'>
                                        <IonLabel>
                                            🕓&nbsp;
                                            {new Date(eventData.date + 'Z').toLocaleString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                                        </IonLabel>
                                    </IonRow>
                                </IonCol>

                                <IonCol size='auto'>
                                    <IonRow className="ion-text-uppercase">{new Date(eventData.date + 'Z').toLocaleString(i18n.language, { month: 'short' })}</IonRow>
                                    <IonRow style={{ fontSize: '30px' }}>{new Date(eventData.date + 'Z').toLocaleString(i18n.language, { day: '2-digit' })}</IonRow>
                                    <IonRow>{new Date(eventData.date + 'Z').toLocaleString(i18n.language, { weekday: 'long' })}</IonRow>
                                </IonCol>
                            </IonRow>

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <div style={{ backgroundColor: eventData.associationColor, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonRow>
                        <IonLabel className='about-event-title'>A propros de l'événement</IonLabel>
                        <IonText>{eventData.description}</IonText>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default EventDetails