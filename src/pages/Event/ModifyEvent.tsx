import { IonActionSheet, IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonSpinner, IonTabButton } from "@ionic/react"
import React, { useEffect, useState } from "react"
import HeaderTitleBack from "../../components/HeaderTitleBack"

import { durationToArray, eventStatus } from "../../Tools/EventsTools"
import { useTranslation } from "react-i18next"
import useImageHandler from "../../Tools/UseImage"
import Api from "../../Tools/Api"
import { useLocation } from "react-router"
import { EventData } from "../../Tools/Interfaces/EventAndAssoInterface"

const ModifyEvent: React.FC = () => {
    // Use for the translation
    const { t } = useTranslation();

    const location = useLocation<{ event: EventData }>();
    const eventData: EventData = location.state?.event;

    const { imageUrl, setImageUrl, actionResult, deleteImage } = useImageHandler();

    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (eventData?.poster) {
            setImageUrl("https://tekiens.net" + eventData.poster);
        }

    }, [imageUrl]);

    if (!eventData) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const values: any = Object.fromEntries(formData.entries());


        if (!values.title || !values.place || !values.dateTime) {
            setErrorText('You need to fill the require fileds');
            return;
        }

        const updatedEvent: Partial<EventData> = {
            id: eventData.id,
            asso_id: eventData.asso_id,
            title: values.title,
            poster: parsePoster(imageUrl as string),
            description: values.description ? values.description : null,
            date: formatDate(values.dateTime),
            place: values.place ? values.place : null,
            duration: arrayToDuration([Number(values.days), Number(values.hours), Number(values.minutes)]),
            price: values.price ? values.price : null,
            link: values.qrCode ? values.qrCode : null,
            access: values.access ? values.access : null,
            status: values.status,
            capacity: values.capacity ? values.capacity : null,
        };

        let fields: any = {};

        console.log(updatedEvent);

        for (let key in eventData) {
            const eventDataField = eventData[key as keyof EventData];
            const updatedEventField = updatedEvent[key as keyof EventData]

            if (eventDataField != updatedEventField) {
                fields[key] = updatedEventField;
            }
        }

        try {
            await Api.event.update(eventData.id, fields);

            history.back();
        } catch (error: any) {
            if (error instanceof Error) {
                setErrorText(error.message);
            }
            else {
                setErrorText("Error while modifying the event, try again");
            }
        }
    };

    const duration = durationToArray(Number(eventData.duration));

    const arrayToDuration = ([days, hours, minutes]: [number, number, number]) => {
        const duration = days * 24 * 60 + hours * 60 + minutes;
        if (duration > 0) {
            return duration;
        }

        return null;
    }

    const formatDate = (date: string) => {
        const parts = date.split('T');

        const datePart = parts[0];
        const timePart = parts[1];

        return `${datePart} ${timePart}:00`;
    }

    const parsePoster = (url: string) => {
        if (url) {
            const urlObject = new URL(url);
            return urlObject.pathname;
        }
        return '';
    }

    return (
        <IonPage>
            <HeaderTitleBack back=''>{t('event.manage.modification.title')}</HeaderTitleBack>
            <IonContent>
                <form className="ion-padding" onSubmit={handleSubmit}>
                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-title.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-title.placeholder')}
                            name="title"
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
                            value={duration[0] ? duration[0] : ''}
                        />
                        <IonInput
                            label={t('event.manage.event-duration.hours.label')}
                            placeholder={t('event.manage.event-duration.hours.placeholder')}
                            name="hours"
                            type="number"
                            clearInput={true}
                            min={0}
                            max={23}
                            value={duration[1] ? duration[1] : ''}
                        />
                        <IonInput
                            label={t('event.manage.event-duration.minutes.label')}
                            placeholder={t('event.manage.event-duration.minutes.placeholder')}
                            name="minutes"
                            type="number"
                            clearInput={true}
                            min={0}
                            max={59}
                            value={duration[2] ? duration[2] : ''}
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
                    <span className='error center-screen'>{errorText}</span>
                </form>
            </IonContent>
        </IonPage >
    )
}

export default ModifyEvent