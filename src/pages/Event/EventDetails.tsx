import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSpinner, IonTabButton, IonText, IonToast } from '@ionic/react'
import { useParams } from 'react-router'
import { ApiResponseEvent, AllEventsData } from '../../Tools/Interfaces/EventInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails .css'
import { getEventStatus, darkenColor, formatDate, duration } from '../../Tools/EventTools'
import { parseText } from '../../Tools/DOMParser'
import { add, starOutline, star, pushOutline, push } from 'ionicons/icons'

const EventDetails: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

    // Use to get the event's id
    const { id } = useParams<{ id: string }>();

    let savedEvents: number[] = [];

    const [eventData, setEventData] = useState<AllEventsData | null>(null);
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

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
                    associationName: associationResult.data.names[0],
                    associationColor: associationResult.data.color,
                };

                setEventData(eventWithAssociation);
                await parseText(eventWithAssociation.description, setDescription);

                const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");
                if (savedEvents.includes(event.id)) {
                    setIsSaved(true);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Loading appears while waiting for data
    if (loading) {
        return (
            <IonTabButton disabled>
                <IonSpinner name='circular' />
            </IonTabButton>
        );
    }

    // We check if we have the data we want
    if (!eventData) {
        return (
            <IonContent>
                <IonLabel>No event data found</IonLabel>
            </IonContent>
        );
    }

    const saveEvent = () => {
        const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

        if (savedEvents.includes(eventData.id)) {
            savedEvents.pop(eventData.id);
            localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
            setIsSaved(false);
        } else {
            savedEvents.push(eventData.id);
            localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
            setIsSaved(true);
        }
    }

    return (
        <IonPage>
            <HeaderTitleBack back="/app/événements">{t('event.title')}</HeaderTitleBack>

            <IonContent>
                <IonToast
                    trigger="saveEvent"
                    position="bottom"
                    swipeGesture="vertical"
                    message={isSaved ? t('event.favorite.add') : t('event.favorite.remove')}
                    duration={1000}
                />

                <IonFab slot="fixed" horizontal="end" vertical="bottom">
                    <IonFabButton style={{ '--background': eventData.associationColor, '--background-activated': darkenColor(eventData.associationColor) }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="top">
                        <IonFabButton onClick={saveEvent} id="saveEvent" style={{ '--border-color': eventData.associationColor }}>
                            <IonIcon icon={isSaved ? star : starOutline} style={{ color: eventData.associationColor }} />
                        </IonFabButton>
                        <IonFabButton style={{ '--border-color': eventData.associationColor }}>
                            <IonIcon icon={pushOutline} style={{ color: eventData.associationColor }} />
                        </IonFabButton>
                    </IonFabList>
                </IonFab>

                <img alt="" src={"https://tekiens.net/" + eventData.poster} width="100%" />
                <IonGrid className='ion-padding'>
                    <IonRow className='info'>
                        <a style={{ color: eventData.associationColor }} href={"/association/" + eventData.asso_id}>{eventData.associationName}</a>
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
                    {/*savedEvents.includes(eventData.id) ?
                        <IonButton style={{ '--background': eventData.associationColor, '--background-activated': darkenColor(eventData.associationColor) }} onClick={saveEvent}>Enregistrer l'évènement</IonButton>
                        :
                        <IonButton style={{ '--background': eventData.associationColor, '--background-activated': darkenColor(eventData.associationColor) }} >Pas enregistrer l'évènement</IonButton>
                    */}
                </IonGrid>
                <div style={{ marginTop: '15%' }} />
            </IonContent>
        </IonPage >
    )
}

export default EventDetails