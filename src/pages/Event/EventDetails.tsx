import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSpinner, IonTabButton, IonText, IonToast } from '@ionic/react'
import { useParams } from 'react-router'
import { ApiResponseEvent, AllEventsData } from '../../Tools/Interfaces/EventInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails .css'
import { getEventStatus } from '../../Tools/eventStatus'
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

    /**
     * Function to return a string with the right format to a date, format : YYYY-MM-DD HH:MM:SS
     * @param date the string in the right format
     * @returns the date from the string
     */
    const formatDate = (date: string) => {
        return new Date(date + 'Z').toLocaleString('FR-fr', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    }

    /**
     * Function to return the duration of an event in days, hours and minutes
     * @param event the event we want to calculat the duration
     * @returns the event's duration in days, hours and minutes
     */
    const duration = (event: AllEventsData) => {
        if (!event.duration)
            return undefined;
        var days = Math.floor(event.duration / 60 / 24);
        var hours = Math.floor(event.duration / 60) % 24;
        var minutes = event.duration % 60;
        return `${days}j ${hours}h ${minutes}min`.replace(/0j /, '').replace(/0h /, '').replace(/ 0min/, '');
    }

    /**
     * Function to darken a color with a set amount
     * @param hex the color we want to darken
     * @param amount the amount we want to darken the color
     * @returns the new darker color
     */
    const darkenColor = (hex: string | undefined, amount = 20) => {
        if (hex) {

            hex = hex.slice(1);

            let num = parseInt(hex, 16);

            let r = (num >> 16) - amount;
            let g = ((num >> 8) & 0x00FF) - amount;
            let b = (num & 0x0000FF) - amount;

            r = Math.max(r, 0);
            g = Math.max(g, 0);
            b = Math.max(b, 0);

            return "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
        }

        return '#000000';
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
                        <IonFabButton onClick={saveEvent} id="saveEvent">
                            <IonIcon icon={isSaved ? star : starOutline} style={{ color: eventData.associationColor }} />
                        </IonFabButton>
                        <IonFabButton>
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