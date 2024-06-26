import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption } from "@ionic/react"
import React from "react"
import HeaderTitleBack from "../../components/HeaderTitleBack"

import { eventStatus } from "../../Tools/EventTools"
import { useTranslation } from "react-i18next"
import { AllEventsData } from "../../Tools/Interfaces/EventInterface"
import { useLocation } from "react-router"

const CreateEvent: React.FC = () => {
    // Use to translate the page
    const { t } = useTranslation();

    const location = useLocation<{ eventData?: AllEventsData }>();
    const { eventData } = location.state;

    console.log(eventData);

    // Default values or empty strings for inputs if event is undefined
    const defaultEvent: AllEventsData = {
        title: "",
        date: "",
        place: "",
        poster: "",
        description: "",
        price: 0,
        duration: 0,
        link: "",
        access: "",
        status: "programmed", // default status value
        capacity: "",
        id: 0,
        asso_id: "",
        createDate: "",
        lastUpdateDate: ""
    };

    // Merge event with defaultEvent to ensure all fields are populated
    const mergedEvent = eventData ? { ...defaultEvent, ...eventData } : defaultEvent;

    return (
        <IonPage>
            <HeaderTitleBack back="">{t('event.manage.title')}</HeaderTitleBack>
            <IonContent>
                <form className="ion-padding">
                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-title.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-title.placeholder')}
                            name="eventTitle"
                            type="text"
                            clearInput={true}
                            value={mergedEvent.title}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-date.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-date.placeholder')}
                            name="dateTime"
                            type="datetime-local"
                            clearInput={true}
                            value={mergedEvent.date}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-place.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-place.placeholder')}
                            name="place"
                            type="text"
                            clearInput={true}
                            value={mergedEvent.place}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-poster.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-poster.placeholder')}
                            name="poster"
                            type="text"
                            clearInput={true}
                            value={mergedEvent.poster}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-description.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-description.placeholder')}
                            name="description"
                            type="text"
                            clearInput={true}
                            value={mergedEvent.description}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-price.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-price.placeholder')}
                            name="price"
                            type="number"
                            clearInput={true}
                            min={0}
                            value={mergedEvent.price}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonLabel position="stacked">{t('event.manage.event-duration.label')}</IonLabel>
                        <IonInput
                            label={t('event.manage.event-duration.days.label')}
                            placeholder={t('event.manage.event-duration.days.placeholder')}
                            name="days"
                            type="number"
                            clearInput={true}
                            value={0}
                            min={0}
                        />
                        <IonInput
                            label={t('event.manage.event-duration.hours.label')}
                            placeholder={t('event.manage.event-duration.hours.placeholder')}
                            name="hours"
                            type="number"
                            clearInput={true}
                            value={1}
                            min={0}
                        />
                        <IonInput
                            label={t('event.manage.event-duration.minutes.label')}
                            placeholder={t('event.manage.event-duration.minutes.placeholder')}
                            name="minutes"
                            type="number"
                            clearInput={true}
                            value={0}
                            min={0}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-qr.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-qr.placeholder')}
                            name="qrCode"
                            type="url"
                            clearInput={true}
                            value={mergedEvent.link}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-access.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-access.placeholder')}
                            name="access"
                            type="text"
                            clearInput={true}
                            value={mergedEvent.access}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonLabel position="stacked">{t('event.manage.event-status.label')}</IonLabel>
                        <IonSelect name="status" placeholder={t('event.manage.event-status.placeholder')} value="programmed">
                            {Object.keys(eventStatus).map(key => (
                                <IonSelectOption key={key} value={key}>{t(eventStatus[key])}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-capacity.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-capacity.placeholder')}
                            name="capacity"
                            type="text"
                            clearInput={true}
                            value={mergedEvent.capacity}
                        />
                    </IonItem>

                    <IonButton type='submit' className='login-item' style={{ 'width': '100%' }}>{t('event.manage.button.creation')}</IonButton>
                    <span className='error center-screen'></span>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default CreateEvent