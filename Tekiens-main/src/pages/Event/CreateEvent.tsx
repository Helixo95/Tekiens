import React, { useState, useEffect } from 'react';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonPage, IonToast } from '@ionic/react';
import { EventData } from '../../Tools/Interfaces/EventAndAssoInterface';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { eventStatus } from '../../Tools/EventsTools';

import ImageInput from '../../components/ImageInput';
import DurationInput from '../../components/DurationInput';
import Api from '../../Tools/Api';
import HeaderTitleBack from '../../components/HeaderTitleBack';
import RichTextComponent from '../../components/RichTextComponent';
import { unParseText } from '../../Tools/DOMParser';


const ModifyEvent: React.FC = () => {
    // Used to translate the page
    const { t } = useTranslation();

    // Use for the session
    const { session } = useAuth();

    const [selectedImage, setSelectedImage] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [duration, setDuration] = useState<number>();
    const [errorText, setErrorText] = useState('');

    // If we're not logged in
    if (!session) {
        history.back();
    }

    // The next two function are used because their value are not in the same component

    /**
     * Function to update the event poster when the user change it
     * @param newImage the new image the user selected
     */
    const handleImageChange = (newImage: string) => {
        setSelectedImage(newImage);
    };

    /**
     * Function to update the duration when the user change it
     * @param newDuration the new duration the user wanted
     */
    const handleDurationUpdate = (newDuration: number) => {
        setDuration(newDuration);
    };

    /**
     * Function when the user submit the form
     * @param event the submit event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // We get the form values
        const formData = new FormData(e.currentTarget);
        const values: any = Object.fromEntries(formData);

        // To coincide with the API null data 
        Object.keys(values).forEach(key => {
            if (values[key] === '') {
                values[key] = null;
            }
        });

        // Get the right format for the date
        values.date = formatDate(values.date);

        // We initialize our new event
        const newEvent: Partial<EventData> = {
            title: values.title,
            poster: selectedImage ? selectedImage : null,
            description: values.description ? values.description : null,
            date: values.date,
            place: values.place,
            duration: duration ? duration : null,
            price: values.price ? values.price : null,
            link: values.link ? values.link : null,
            access: values.access ? values.access : null,
            status: values.status,
            capacity: values.capacity ? values.capacity : null,
        };

        // We'll put in here all the values we'll need to create the event
        let fields: any = {};

        // For each key
        for (let key in newEvent) {
            // We look only not null values
            if (newEvent[key as keyof EventData] != null) {
                // We get the value
                const newEventField = newEvent[key as keyof EventData];

                // And we put them in our fields
                fields[key] = newEventField;
            }
        }

        if (description) {
            fields['description'] = unParseText(description);
        }

        // We can create our event
        try {
            Api.event.create(fields);

            setErrorText('');
            history.back();
        } catch (error: any) {
            if (error instanceof Error) {
                setErrorText(error.message);
            } else {
                setErrorText("Error while creating the event, try again");
            }
        }
    };

    /**
     * Function to get the date in the right format yyyy/mm/ddThh:mm to yyyy/mm/dd hh:mm:ss
     * @param date our date we want to change the format
     * @returns the right date format
     */
    const formatDate = (date: string) => {
        const [datePart, timePart] = date.split('T');
        return `${datePart} ${timePart}:00`;
    }

    return (
        <IonPage>
            <HeaderTitleBack back=''>{t('event.manage.creation.title')}</HeaderTitleBack>
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
                            required
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-date.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-date.placeholder')}
                            name="date"
                            type="datetime-local"
                            clearInput={true}
                            required
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
                            required
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel>{t('event.manage.event-poster.label')}</IonLabel>
                            <ImageInput currentImage={selectedImage} onImageSelected={handleImageChange} />
                        </div>
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel style={{ "marginBottom": "3%" }} >{t('event.manage.event-description.label')}</IonLabel>
                            <RichTextComponent value={description} callback={setDescription} />
                        </div>
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
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel position="stacked">{t('event.manage.event-duration.label')}</IonLabel>
                            <DurationInput initialValue={0} onUpdate={handleDurationUpdate} />
                        </div>
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-qr.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-qr.placeholder')}
                            name="link"
                            type="url"
                            clearInput={true}
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
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonLabel position="stacked">{t('event.manage.event-status.label')}</IonLabel>
                        <IonSelect name="status" placeholder={t('event.manage.event-status.placeholder')} value='programmed' >
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
                        />
                    </IonItem>

                    <IonButton expand="block" type='submit'>
                        {t('event.manage.creation.button')}
                    </IonButton>
                    <span className='error center-screen-padding'>{errorText}</span>
                </form>

            </IonContent>
        </IonPage >
    );
};

export default ModifyEvent;
