import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow, IonSpinner, IonTabButton, IonText } from '@ionic/react'
import { useParams } from 'react-router'
import { ApiResponseEvent, AllEventsData } from '../../Tools/Interfaces/EventInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails .css'
import { getEventStatus } from '../../Tools/eventStatus'
import { parseText } from '../../Tools/DOMParser'

const EventDetails: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

    const { id } = useParams<{ id: string }>();

    const [eventData, setEventData] = useState<AllEventsData | null>(null);
    const [description, setDescription] = useState<string>("");
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
                await parseText(eventWithAssociation.description, setDescription);

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

    /**
     * Method to return a string with the right format to a date, format : YYYY-MM-DD HH:MM:SS
     * @param date the string in the right format
     * @returns the date from the string
     */
    const formatDate = (date: string) => {
        return new Date(date + 'Z').toLocaleString('FR-fr', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    }

    const duration = (event: AllEventsData) => {
        if (!event.duration)
            return undefined;
        var days = Math.floor(event.duration / 60 / 24);
        var hours = Math.floor(event.duration / 60) % 24;
        var minutes = event.duration % 60;
        return `${days}j ${hours}h ${minutes}min`.replace(/0j /, '').replace(/0h /, '').replace(/ 0min/, '');
    }


    return (
        <IonPage>
            <HeaderTitleBack back="/app/événements">{t('event.title')}</HeaderTitleBack>

            <IonContent>
                {<img alt="" src={"https://tekiens.net/" + eventData.poster} width="100%" />}
                <IonGrid className='ion-padding'>
                    <IonRow className='info'>
                        <IonLabel style={{ color: eventData.associationColor }}>{eventData.associationName}</IonLabel>
                    </IonRow>

                    <IonRow className='info'>
                        <IonLabel className='about-event-title'>{eventData.title}</IonLabel>
                    </IonRow>

                    <IonRow className='info'>
                        <IonLabel>
                            📍&nbsp;
                            {eventData.place}
                        </IonLabel>
                    </IonRow>

                    <IonRow className='info'>
                        <IonLabel>
                            📅&nbsp;&nbsp;
                            {formatDate(eventData.date)}
                        </IonLabel>
                    </IonRow>

                    <IonRow className='info'>
                        <IonLabel>
                            🕓&nbsp;
                            {new Date(eventData.date + 'Z').toLocaleString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                        </IonLabel>
                    </IonRow>

                    <IonCol />
                    <IonRow>
                        <div style={{ backgroundColor: eventData.associationColor, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonLabel className='about-event-title'>A propros de l'événement</IonLabel>
                    </IonRow>
                    <IonCol />

                    <IonRow className='justify-text'>
                        <IonText><div dangerouslySetInnerHTML={{ __html: description }}></div></IonText>
                    </IonRow>
                    <IonCol />


                    <IonRow>
                        <div style={{ backgroundColor: eventData.associationColor, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonLabel className='about-event-title'>Informations supplémentaires</IonLabel>
                    </IonRow>
                    <IonCol />

                    {eventData.duration &&
                        <IonRow className='info'>
                            <IonLabel>
                                ⌛​&nbsp;
                                {duration(eventData)}
                            </IonLabel>
                        </IonRow>
                    }

                    {eventData.price &&
                        <IonRow className='info'>
                            <IonLabel>
                                💲&nbsp;
                                {eventData.price}
                            </IonLabel>
                        </IonRow>
                    }

                    {eventData.link &&
                        <IonRow className='info'>
                            <IonLabel>
                                🖇&nbsp;
                                <a href={eventData.link} target="_blank" rel="noreferrer" style={{ color: eventData.associationColor }}>Lien de l'évènement</a>
                            </IonLabel>
                        </IonRow>
                    }

                    {eventData.access &&
                        <IonRow className='info'>
                            <IonLabel>
                                🔒&nbsp;
                                {eventData.access}
                            </IonLabel>
                        </IonRow>
                    }

                    {eventData.status &&
                        <IonRow className='info'>
                            <IonLabel>{getEventStatus(eventData)}</IonLabel>
                        </IonRow>
                    }

                    {eventData.capacity &&
                        <IonRow className='info'>
                            <IonLabel>
                                👥&nbsp;
                                {eventData.capacity}
                            </IonLabel>
                        </IonRow>
                    }

                    {eventData.createDate &&
                        <IonRow className='info'>
                            <IonLabel>
                                📝 Crée le&nbsp;
                                {formatDate(eventData.createDate)}
                            </IonLabel>
                        </IonRow>
                    }

                    {eventData.lastUpdateDate &&
                        <IonRow className='info'>
                            <IonLabel>
                                🔄 Dernière mise à jour le&nbsp;
                                {formatDate(eventData.lastUpdateDate)}
                            </IonLabel>
                        </IonRow>
                    }

                </IonGrid>
            </IonContent>
        </IonPage >
    )
}

export default EventDetails