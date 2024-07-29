import React, { useEffect, useState } from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { IonAlert, IonButton, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonIcon, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSpinner, IonTabButton, IonText, IonToast, RefresherEventDetail, useIonRouter } from '@ionic/react'
import { useHistory, useParams } from 'react-router'
import { AssosData } from '../../Tools/Interfaces/EventAndAssoInterface'
import { useTranslation } from 'react-i18next'
import '../../theme/Event/EventDetails.css'
import { darkenColor, formatDate, duration, getEventStatus } from '../../Tools/EventsTools'
import { parseText } from '../../Tools/DOMParser'
import { add, starOutline, star, pushOutline, push, pencilOutline, trashOutline, searchOutline, help, notificationsCircleOutline, notificationsOffCircleOutline, notificationsOutline, notificationsOffOutline } from 'ionicons/icons'
import { useAuth } from '../../contexts/AuthContext'
import Api from '../../Tools/Api'
import { isEventSaved, saveEvent } from '../../Tools/LocalStorage/LocalStorageEvents'
import { useEventDataContext } from '../../contexts/EventDataContext'
import { cancelNotification, doesNotificationExist, sendNotification } from '../../Tools/NotificationsHandler'

const EventDetails: React.FC = () => {
    // Used to translate the page
    const { t, i18n } = useTranslation();

    // Use to get the event's id from the href
    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    // Get the desire function and values from the context
    const { session } = useAuth();
    const { eventData, setEventData } = useEventDataContext();

    const [assoData, setAssoData] = useState<AssosData>();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showNotifToast, setShowNotifToast] = useState(false);
    const [bcanSelectNotification, setCanSelectNotification] = useState<boolean>(false);
    const [bDoesNotficationExist, setNotificationExist] = useState<boolean>(false);

    // We get the event data and its association
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

                const currentDate = new Date();
                const parsedDate = new Date(eventData.date.replace(' ', 'T'));
                parsedDate.setHours(parsedDate.getHours() + 2);


                if (currentDate.getTime() < parsedDate.getTime()) {
                    // Check if a notification already exist
                    const bDoesExist = await doesNotificationExist(Number(id));
                    setCanSelectNotification(true);
                    setNotificationExist(bDoesExist);
                }
            }

            catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
    };

    const handleNotificationClick = async (data: string[]) => {
        try {

            if (!eventData) {
                throw new Error("Event data is null");
            }

            // Retrieve the id of the event, that will also become the id of the notification
            const id_Number = Number(id);
            // Check if the notification already exists
            const bDoesExist = await doesNotificationExist(id_Number);

            // Remove or cancel the notification if it exists
            if (bDoesExist) {
                await cancelNotification(id_Number);
            } else {
                const name = data[0] || eventData.title;
                const description = data[1] || t('notification.description');


                // Create new notification
                const nowDate = new Date();
                nowDate.setHours(nowDate.getHours() + 2);
                const parsedDate = eventData.date.replace(' ', 'T');

                let NotificationDate = new Date(parsedDate);
                NotificationDate.setHours(NotificationDate.getHours() + 2);
                console.log(NotificationDate);

                // Un-used notification lead time system (Can have the notification played x hours before it starts)

                // Adjust the  time zone and the lead time
                /*
                // const leadTime = Math.max(0, Math.min(parseInt(data[2], 10), 8)); // Automatically clamp the leadTime from 0 to 8
                NotificationDate.setHours(NotificationDate.getHours() + 2 - leadTime);

                // Send the notification now if the notification date has already been past
                if(NotificationDate.getTime() - nowDate.getTime() <= 0){
                    NotificationDate =  nowDate;
                }

                NotificationDate.setSeconds(NotificationDate.getSeconds() + );
                console.log("Notification Date: ",  NotificationDate);*/

                // Send notification
                await sendNotification(name, description, NotificationDate, id_Number);

                // Update state to indicate notification exists
                setNotificationExist(true);
            }

            // Check notification existence again (this could be unnecessary if you handled it correctly above)
            const val = await doesNotificationExist(Number(id));
            setNotificationExist(val);

            setShowNotifToast(true);

        } catch (error) {
            console.error("Error in handleNotificationClick:", error);
        }
    }


    // useEffect to call the API when we load the page
    useEffect(() => {
        fetchData();
    }, [id]);

    // Loading appears while waiting for data
    if (loading) {
        return (
            <>

                <HeaderTitleBack back="">{t('event.title')}</HeaderTitleBack>
                <IonContent>
                    <IonTabButton disabled>
                        <IonSpinner name='circular' />
                    </IonTabButton>
                </IonContent>
            </>

        );
    }

    // We check if we have the data we want
    if (!eventData) {
        return (
            <>
                <HeaderTitleBack back="">{t('event.title')}</HeaderTitleBack>
                <IonContent className="ion-padding">
                    <div className="center-screen-text">
                        <IonLabel style={{ "marginBottom": "25%" }}>Aucune information n'a été trouvé</IonLabel>
                        <div>
                            <IonIcon size="large" icon={searchOutline} /> <IonIcon size="large" icon={help} />
                        </div>
                    </div>
                </IonContent>
            </>
        );
    }

    // Function to go to the event modify opage
    const navigateToModifyEvent = () => {
        history.push(`/event/modify/${eventData.id}`);
    };

    // Function if the user want to reload the page
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData().then(() => event.detail.complete());
    }

    /**
     * Function to know if an event is editable
     * @returns true if we can edit it and false if not
     */
    const editable = () => {
        if (!session) {
            return false;
        }

        return assoData?.id === session.asso_id;
    };

    /**
     * Function to validate a string format to a CY Tech mail
     * @param email the string we want to check the format
     * @returns true is the format is correct and false if not
     */
    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@cy-tech.fr/;
        return regex.test(email);
    };

    return (
        <IonPage>
            <HeaderTitleBack back="">{t('event.title')}</HeaderTitleBack>

            <IonContent>
                <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                <IonToast
                    isOpen={showNotifToast}
                    onDidDismiss={() => setShowNotifToast(false)}
                    position="bottom"
                    swipeGesture="vertical"
                    message={bDoesNotficationExist ? t('notification.active') : t('notification.not-active')}
                    duration={1000}
                />

                <IonToast
                    trigger="save-event"
                    position="bottom"
                    swipeGesture="vertical"
                    message={isSaved ? t('event.favorite.add') : t('event.favorite.remove')}
                    duration={1000}
                />

                <IonAlert
                    header="Suppression"
                    message="Voulez-vous vraiment supprimer l'événement ?"
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

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Please enter your info"
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                        },
                        {
                            text: 'OK',
                            role: 'confirm',
                            handler: (alertData) => {
                                const email = alertData.email;
                                if (!validateEmail(email)) {
                                    alert('Please enter a valid email address.');
                                    return false;
                                }
                                return true;
                            },
                        },
                    ]}
                    inputs={[
                        {
                            name: 'email',
                            type: 'email',
                            placeholder: 'Email',
                        },
                    ]}
                />

                <IonFab slot="fixed" horizontal="end" vertical="bottom">
                    <IonFabButton style={{ '--background': assoData?.color, '--background-activated': darkenColor(assoData?.color) }}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="top">
                        <IonFabButton className='fab-button' onClick={() => saveEvent(eventData.id, setIsSaved)} id="save-event" style={{ '--border-color': assoData?.color }}>
                            <IonIcon icon={isSaved ? star : starOutline} style={{ color: assoData?.color }} />
                        </IonFabButton>

                        <IonFabButton className='fab-button' onClick={() => setShowAlert(true)} style={{ '--border-color': assoData?.color }}>
                            <IonIcon icon={pushOutline} style={{ color: assoData?.color }} />
                        </IonFabButton>

                        {bcanSelectNotification &&
                            <IonFabButton className='fab-button' id='notif-event' style={{ '--border-color': assoData?.color }}>

                                <IonIcon
                                    icon={bDoesNotficationExist ? notificationsOutline : notificationsOffOutline}
                                    style={{ color: assoData?.color }}
                                    onClick={bDoesNotficationExist ? () => handleNotificationClick([""]) : undefined}
                                />

                                {!bDoesNotficationExist &&
                                    <IonAlert
                                        trigger='notif-event'
                                        header='NOTIFICATION (No text result in default message)'

                                        buttons={[{ text: "OK", handler: (data) => handleNotificationClick(data) }]}
                                        inputs={[
                                            {
                                                type: 'textarea',
                                                placeholder: 'Notification name',
                                            },
                                            {
                                                type: "textarea",
                                                placeholder: 'Notification description'
                                            },
                                            /*
                                            {
                                                type: 'number',
                                                placeholder: 'Notify 0-8 hours prior (auto-clamp)',
                                                min: 0,
                                                max: 8,
                                            },*/
                                        ]}
                                    />}
                            </IonFabButton>
                        }

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
                        <a style={{ color: assoData?.color }} href={`/association/${eventData.asso_id}`}>{assoData?.names[0]}</a>
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