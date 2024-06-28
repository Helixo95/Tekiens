import { IonActionSheet, IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption } from "@ionic/react"
import React, { useEffect } from "react"
import HeaderTitleBack from "../../components/HeaderTitleBack"

import { eventStatus } from "../../Tools/EventTools"
import { useTranslation } from "react-i18next"
import { useLocation, useParams } from "react-router"
import useImageHandler from "../../Tools/UseImage"
import { EventData } from "../../Tools/Interfaces/EventInterface"

const ModifyEvent: React.FC = () => {
    // Use for the translation
    const { t } = useTranslation();

    const location = useLocation<{ event: EventData }>();
    const eventData: EventData = location.state?.event;

    const { imageUrl, setImageUrl, actionResult, deleteImage } = useImageHandler();

    useEffect(() => {
        if (eventData?.poster) {
            setImageUrl("https://tekiens.net" + eventData.poster);
        }
    }, [eventData, setImageUrl]);

    if (!eventData) {
        return null;
    }

    return (
        <IonPage>
            <HeaderTitleBack back=''>{t('event.manage.modification.title')}</HeaderTitleBack>
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
                            value={eventData.title}
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
                            value={eventData.date}
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
                            value={eventData.place}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonLabel position="stacked">{t('event.manage.event-poster.label')}</IonLabel>
                        {!imageUrl ?
                            <>
                                <IonButton id="open-action-sheet">{t('event.manage.event-poster.button.select')}</IonButton>
                                <IonActionSheet
                                    trigger="open-action-sheet"
                                    header="Example header"
                                    subHeader="Example subheader"
                                    buttons={[
                                        {
                                            text: 'Gallery',
                                            data: {
                                                action: 'gallery',
                                            },
                                        },
                                        {
                                            text: 'Photo',
                                            data: {
                                                action: 'photo',
                                            },
                                        },
                                        {
                                            text: 'Cancel',
                                            role: 'cancel',
                                            data: {
                                                action: 'cancel',
                                            },
                                        },
                                    ]}
                                    onDidDismiss={({ detail }) => actionResult(detail)}
                                />
                            </>
                            :
                            <>
                                <img className="center-screen" src={imageUrl} alt="Selected from Gallery" />
                                <IonButton onClick={deleteImage}>{t('event.manage.event-poster.button.delete')}</IonButton>
                            </>
                        }
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-description.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-description.placeholder')}
                            name="description"
                            type="text"
                            clearInput={true}
                            value={eventData.description}
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
                            value={eventData.price}
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
                            min={0}
                        />
                        <IonInput
                            label={t('event.manage.event-duration.hours.label')}
                            placeholder={t('event.manage.event-duration.hours.placeholder')}
                            name="hours"
                            type="number"
                            clearInput={true}
                            min={0}
                            max={23}
                        />
                        <IonInput
                            label={t('event.manage.event-duration.minutes.label')}
                            placeholder={t('event.manage.event-duration.minutes.placeholder')}
                            name="minutes"
                            type="number"
                            clearInput={true}
                            min={0}
                            max={59}
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
                            value={eventData.link}
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
                            value={eventData.access}
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
                            type="number"
                            clearInput={true}
                            min={0}
                            value={eventData.capacity}
                        />
                    </IonItem>

                    <IonButton type='submit' className='login-item' style={{ 'width': '100%' }}>{t('event.manage.modification.button')}</IonButton>
                    <span className='error center-screen'></span>
                </form>
            </IonContent>
        </IonPage >
    )
}

export default ModifyEvent