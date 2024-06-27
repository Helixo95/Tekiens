import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSpinner, IonTabButton, IonText, IonToast, useIonRouter } from '@ionic/react'
import { useParams } from 'react-router'
import { ApiResponseEvent, AllEventsData } from '../../Tools/Interfaces/EventInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails.css'
import { darkenColor, formatDate, duration, getEventStatus } from '../../Tools/EventTools'
import { parseText } from '../../Tools/DOMParser'
import { add, starOutline, star, pushOutline, push, pencilOutline } from 'ionicons/icons'

const EventDetails: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

    // Use to get the event's id
    const { id } = useParams<{ id: string }>();

    const router = useIonRouter();

    let savedEvents: number[] = [];

    const [eventData, setEventData] = useState<AllEventsData>();
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

    const navigateToCreateEvent = () => {
        router.push('/event/modify/' + eventData.id);
    }

    return (
        <IonPage>
            <HeaderTitleBack back="">{t('event.title')}</HeaderTitleBack>

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
                        <IonFabButton className='fab-button' onClick={saveEvent} id="saveEvent" style={{ '--border-color': eventData.associationColor }}>
                            <IonIcon icon={isSaved ? star : starOutline} style={{ color: eventData.associationColor }} />
                        </IonFabButton>
                        <IonFabButton className='fab-button' style={{ '--border-color': eventData.associationColor }}>
                            <IonIcon icon={pushOutline} style={{ color: eventData.associationColor }} />
                        </IonFabButton>
                        <IonFabButton className='fab-button' style={{ '--border-color': eventData.associationColor }} onClick={navigateToCreateEvent}>
                            <IonIcon icon={pencilOutline} style={{ color: eventData.associationColor }} />
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
                        <IonLabel className='about-event-title'>{t('event.about')}</IonLabel>
                    </IonRow>
                    <IonCol />

                    <IonRow className='justify-text'>
                        <IonText>{description ?
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>
                            :
                            t('event.no-description')}
                        </IonText>
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <div style={{ backgroundColor: eventData.associationColor, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonLabel className='about-event-title'>{t('event.more-info')}</IonLabel>
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
                                <a href={eventData.link} target="_blank" rel="noreferrer" style={{ color: eventData.associationColor }}>{t('event.link')}</a>
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
                            <IonLabel>{t(getEventStatus(eventData))}</IonLabel>
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
                                {t('event.create')}&nbsp;
                                {formatDate(eventData.createDate)}
                            </IonLabel>
                        </IonRow>
                    }

                    {eventData.lastUpdateDate &&
                        <IonRow className='info'>
                            <IonLabel>
                                {t('event.update')}&nbsp;
                                {formatDate(eventData.lastUpdateDate)}
                            </IonLabel>
                        </IonRow>
                    }

                </IonGrid>
                <div style={{ marginTop: '15%' }} />
            </IonContent>
        </IonPage >
    )
}

export default EventDetails