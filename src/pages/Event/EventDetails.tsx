import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonAlert, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSpinner, IonTabButton, IonText, IonToast, RefresherEventDetail, useIonRouter } from '@ionic/react'
import { useHistory, useParams } from 'react-router'
import { AssosData } from '../../Tools/Interfaces/EventAndAssoInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails.css'
import { darkenColor, formatDate, duration, getEventStatus } from '../../Tools/EventsTools'
import { parseText } from '../../Tools/DOMParser'
import { add, starOutline, star, pushOutline, push, pencilOutline, trashOutline } from 'ionicons/icons'
import { useAuth } from '../../contexts/AuthContext'
import Api from '../../Tools/Api'
import { isEventSaved, saveEvent } from '../../Tools/LocalStorage/LocalStorageEvents'
import { useEventDataContext } from '../../contexts/EventDataContext'

const EventDetails: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

    // Use to get the event's id from the href
    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const { session } = useAuth();

    const { eventData, setEventData } = useEventDataContext();

    const [assoData, setAssoData] = useState<AssosData>();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        if (!isNaN(Number(id))) {

            try {
                const eventData = await Api.event.getOne(Number(id));

                setEventData(eventData);

                await parseText(eventData.description, setDescription);
                setIsSaved(isEventSaved(eventData.id));

                const assoData = await Api.assos.getOne(eventData.asso_id);
                setAssoData(assoData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
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
        history.push(`/event/modify/${eventData.id}`);
    };

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData().then(() => event.detail.complete());
    }

    const editable = () => {
        if (!session) {
            return false;
        }

        return assoData?.id === session.asso_id;
    };

    return (
        <IonPage>
            <HeaderTitleBack back="">{t('event.title')}</HeaderTitleBack>

            <IonContent>
                <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonToast
                    trigger="saveEvent"
                    position="bottom"
                    swipeGesture="vertical"
                    message={isSaved ? t('event.favorite.add') : t('event.favorite.remove')}
                    duration={1000}
                />

                <IonAlert
                    header="Suppression"
                    message="Voulez-vous vraiment supprimer l'évènement ?"
                    trigger="delete-event"
                    buttons={[
                        {
                            text: 'Annuler',
                            role: 'cancel',
                        },
                        {
                            text: 'Oui',
                            role: 'confirm',
                            handler: async () => {
                                await Api.event.delete(eventData.id);
                                history.goBack();
                            },
                        },
                    ]}
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

                        {editable() &&
                            <>
                                <IonFabButton className='fab-button' style={{ '--border-color': assoData?.color }} onClick={navigateToModifyEvent}>
                                    <IonIcon icon={pencilOutline} style={{ color: assoData?.color }} />
                                </IonFabButton>
                                <IonFabButton className='fab-button' id="delete-event" style={{ '--border-color': assoData?.color }} >
                                    <IonIcon icon={trashOutline} style={{ color: assoData?.color }} />
                                </IonFabButton>
                            </>
                        }
                    </IonFabList>
                </IonFab>

                <img alt="" src={eventData.poster ? `${eventData.poster}?${Date.now()}` : ""} width="100%" />
                <IonGrid className='ion-padding'>
                    <IonRow className='info'>
                        <a style={{ color: assoData?.color }} onClick={() => history.push("/association/" + eventData.asso_id)}>{assoData?.names[0]}</a>
                    </IonRow>

                    <IonRow className='info'>
                        <IonLabel className='about-event-title'>{eventData.title}</IonLabel>
                    </IonRow>

                    <IonRow className='info'>
                        <IonCol>
                            <IonLabel>
                                📍&nbsp;
                                {eventData.place}
                            </IonLabel>
                        </IonCol>
                    </IonRow>

                    <IonRow className='info'>
                        <IonCol>
                            <IonLabel>
                                📅&nbsp;&nbsp;
                                {formatDate(eventData.date)}
                            </IonLabel>
                        </IonCol>
                    </IonRow>

                    <IonRow className='info'>
                        <IonCol>
                            <IonLabel>
                                🕓&nbsp;
                                {new Date(eventData.date + 'Z').toLocaleString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                            </IonLabel>
                        </IonCol>
                    </IonRow>

                    <IonCol />
                    <IonRow>
                        <IonCol>
                            <div style={{ backgroundColor: assoData?.color, width: '100%', height: '3px' }} />
                        </IonCol>
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonCol>
                            <IonLabel className='about-event-title'>{t('event.about')}</IonLabel>
                        </IonCol>
                    </IonRow>

                    <IonRow className='justify-text'>
                        <IonCol>
                            <IonText>{description ?
                                <div dangerouslySetInnerHTML={{
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
                        </IonCol>
                    </IonRow>

                    <IonCol />
                    <IonRow>
                        <div style={{ backgroundColor: assoData?.color, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonCol>
                            <IonLabel className='about-event-title'>{t('event.more-info')}</IonLabel>
                        </IonCol>
                    </IonRow>

                    {eventData.duration &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    ⌛​&nbsp;
                                    {duration(eventData)}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {eventData.price &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    💲&nbsp;
                                    {eventData.price}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {eventData.link &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    🖇&nbsp;
                                    <a href={eventData.link} target="_blank" rel="noreferrer" style={{ color: assoData?.color }}>{t('event.link')}</a>
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {eventData.access &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    🔒&nbsp;
                                    {eventData.access}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {eventData.status &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>{t(getEventStatus(eventData))}</IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {eventData.capacity &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    👥&nbsp;
                                    {eventData.capacity}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {eventData.createDate &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    {t('event.create')}&nbsp;
                                    {formatDate(eventData.createDate)}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {eventData.lastUpdateDate &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    {t('event.update')}&nbsp;
                                    {formatDate(eventData.lastUpdateDate)}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                </IonGrid>

                <div style={{ margin: '15%' }} />
            </IonContent>
        </IonPage >
    )
}

export default EventDetails