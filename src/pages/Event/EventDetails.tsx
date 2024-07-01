import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSpinner, IonTabButton, IonText, IonToast, useIonRouter } from '@ionic/react'
import { useHistory, useParams } from 'react-router'
import { AssosData, EventData } from '../../Tools/Interfaces/EventAndAssoInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails.css'
import { darkenColor, formatDate, duration, getEventStatus } from '../../Tools/EventsTools'
import { parseText } from '../../Tools/DOMParser'
import { add, starOutline, star, pushOutline, push, pencilOutline } from 'ionicons/icons'
import { useAuth } from '../../contexts/AuthContext'
import Api from '../../Tools/Api'
import { isEventSaved, saveEvent } from '../../Tools/LocalStorage/LocalStorageEvents'

const EventDetails: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

    // Use to get the event's id from the href
    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const { isAuthenticated, session } = useAuth();

    let savedEvents: number[] = [];
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const [eventData, setEventData] = useState<EventData>();
    const [assoData, setAssoData] = useState<AssosData>();

    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await Api.event.getOne(id);
                setEventData(eventData);

                await parseText(eventData.description, setDescription);
                setIsSaved(isEventSaved(eventData.id));

                const assoData = await Api.assos.getOne(eventData.asso_id);
                setAssoData(assoData)

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
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
                <IonLabel>No data was found</IonLabel>
            </IonContent>
        );
    }

    const navigateToModifyEvent = () => {
        history.push(`/event/modify/${eventData.id}`, { event: eventData });
    };

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
                    <IonFabButton style={{ '--background': assoData?.color, '--background-activated': darkenColor(assoData?.color) }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="top">
                        <IonFabButton className='fab-button' onClick={() => saveEvent(eventData.id, setIsSaved)} id="saveEvent" style={{ '--border-color': assoData?.color }}>
                            <IonIcon icon={isSaved ? star : starOutline} style={{ color: assoData?.color }} />
                        </IonFabButton>

                        <IonFabButton className='fab-button' style={{ '--border-color': assoData?.color }}>
                            <IonIcon icon={pushOutline} style={{ color: assoData?.color }} />
                        </IonFabButton>

                        {isAuthenticated && session?.id === assoData?.id &&
                            <IonFabButton className='fab-button' style={{ '--border-color': assoData?.color }} onClick={navigateToModifyEvent}>
                                <IonIcon icon={pencilOutline} style={{ color: assoData?.color }} />
                            </IonFabButton>
                        }
                    </IonFabList>
                </IonFab>

                <img alt="" src={"https://tekiens.net" + eventData.poster} width="100%" />
                <IonGrid className='ion-padding'>
                    <IonRow className='info'>
                        <a style={{ color: assoData?.color }} href={"/association/" + eventData.asso_id}>{assoData?.names[0]}</a>
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
                        <div style={{ backgroundColor: assoData?.color, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonLabel className='about-event-title'>{t('event.about')}</IonLabel>
                    </IonRow>
                    <IonCol />

                    <IonRow className='justify-text'>
                        <IonText>{description ?
                            <div style={{}} dangerouslySetInnerHTML={{
                                __html:
                                    `<style>
                                        div a {
                                            color: ${assoData?.color}
                                        }
                                    </style> ${description}`
                            }} />
                            :
                            t('event.no-description')}
                        </IonText>
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <div style={{ backgroundColor: assoData?.color, width: '100%', height: '3px' }} />
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
                                <a href={eventData.link} target="_blank" rel="noreferrer" style={{ color: assoData?.color }}>{t('event.link')}</a>
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