import React, { useState, useEffect } from 'react';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonTabButton, IonSpinner, IonAlert, IonPage, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { EventData } from '../../Tools/Interfaces/EventAndAssoInterface';
import { useEventDataContext } from '../../contexts/EventDataContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { eventStatus } from '../../Tools/EventsTools';

import ImageInput from '../../components/ImageInput';
import DurationInput from '../../components/DurationInput';
import Api from '../../Tools/Api';
import HeaderTitleBack from '../../components/HeaderTitleBack';
import { help, searchOutline } from 'ionicons/icons';


const ModifyEvent: React.FC = () => {
    // Used to translate the page
    const { t } = useTranslation();

    // Use for the session
    const { session } = useAuth();

    // Use to know which event we want to modify
    const { id } = useParams<{ id: string }>();

    const { eventData, setEventData } = useEventDataContext();
    const [updatedEvent, setUpdatedEvent] = useState<EventData>();
    const [loading, setLoading] = useState(true);
    const [errorText, setErrorText] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [formValues, setFormValues] = useState<any>(null);

    // If we're not logged in
    if (!session) {
        history.back();
    }

    // Get the event data
    useEffect(() => {
        const fetchData = async () => {
            if (!isNaN(Number(id))) {
                try {
                    const eventData = await Api.event.getOne(Number(id));
                    setEventData(eventData);
                    setUpdatedEvent(eventData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    // Loading appears while waiting for data
    if (loading) {
        return (
            <>
                <HeaderTitleBack back=''>{t('event.manage.modification.title')}</HeaderTitleBack>
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
                <HeaderTitleBack back=''>{t('event.manage.modification.title')}</HeaderTitleBack>
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

    if (!updatedEvent) {
        return null;
    }

    // The next two function are used because their value are not in the same component

    /**
     * Function to update the event poster when the user change it
     * @param newImage the new image the user selected
     */
    const handleImageChange = (newImage: string) => {
        setUpdatedEvent({
            ...updatedEvent,
            poster: newImage,
        });
    };

    /**
     * Function to update the duration when the user change it
     * @param newDuration the new duration the user wanted
     */
    const handleDurationUpdate = (newDuration: number) => {
        setUpdatedEvent({
            ...updatedEvent,
            duration: newDuration
        });
    };

    /**
     * Function when the user submit the form
     * @param event the submit event
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the form automatic redirection
        event.preventDefault();

        // We update the form values with the latest we have
        setFormValues(new FormData(event.currentTarget));

        setShowAlert(true);
    };

    // When the user confirm to modify the event
    const confirmSubmit = async () => {
        // We get the form values
        const values: any = Object.fromEntries(formValues.entries());

        // To coincide with the API null data 
        Object.keys(values).forEach(key => {
            if (values[key] === '') {
                values[key] = null;
            }
        });

        // Get the right format for the date
        values.date = formatDate(values.date);

        // We'll put in here all the values we'll need to update the event
        let fields: any = {};

        // For each key
        for (let key in eventData) {
            // We look only defined values
            if (values[key as keyof EventData] != undefined) {
                // We get the value
                const eventDataField = eventData[key as keyof EventData];
                const valuesField = values[key as keyof EventData];

                // And if they're different we put them in our fields
                if (eventDataField != valuesField) {
                    fields[key] = valuesField;
                }
            }
        }

        // We need to manually update the poster and the duration because they are treated differently

        if (updatedEvent.duration != eventData.duration) {
            if (updatedEvent.duration != 0) {
                fields['duration'] = updatedEvent.duration;
            }
            else {
                fields['duration'] = null;
            }
        }

        if (updatedEvent.poster != eventData.poster) {
            fields['poster'] = updatedEvent.poster;
        }

        // We can update our event
        try {
            await Api.event.update(eventData.id, fields);

            setEventData(prev => ({
                ...prev,
                ...updatedEvent
            }));

            setErrorText('');

            history.back();
        } catch (error: any) {
            if (error instanceof Error) {
                setErrorText(error.message);
            } else {
                setErrorText("Error while modifying the event, try again");
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
                            required
                            value={updatedEvent.title}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, title: e.detail.value! })}
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
                            value={updatedEvent.date}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, date: formatDate(e.detail.value!) })}
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
                            value={updatedEvent.place}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, place: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel>{t('event.manage.event-poster.label')}</IonLabel>
                            <ImageInput resetValue={eventData.poster} currentImage={updatedEvent.poster} onImageSelected={handleImageChange} />
                        </div>
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('event.manage.event-description.label')}
                            labelPlacement="floating"
                            placeholder={t('event.manage.event-description.placeholder')}
                            name="description"
                            type="text"
                            clearInput={true}
                            value={updatedEvent.description}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, description: e.detail.value || null })}
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
                            value={updatedEvent.price}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, price: e.detail.value || null })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel>{t('event.manage.event-duration.label')}</IonLabel>
                            <DurationInput initialValue={eventData.duration || 0} onUpdate={handleDurationUpdate} />
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
                            value={updatedEvent.link}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, link: e.detail.value || null })}
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
                            value={updatedEvent.access}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, access: e.detail.value || null })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonLabel position="stacked">{t('event.manage.event-status.label')}</IonLabel>
                        <IonSelect name="status" placeholder={t('event.manage.event-status.placeholder')} value={updatedEvent.status} onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, status: e.detail.value! })}>
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
                            value={updatedEvent.capacity}
                            onIonChange={(e) => setUpdatedEvent({ ...updatedEvent, capacity: e.detail.value || null })}
                        />
                    </IonItem>

                    <IonButton expand="block" type='submit'>
                        {t('event.manage.modification.button')}
                    </IonButton>
                    <span className='error center-screen-padding'>{errorText}</span>
                </form>

                <IonAlert
                    isOpen={showAlert}
                    header={t('event.manage.modification.alert.header')}
                    message={t('event.manage.modification.alert.message')}
                    buttons={[
                        {
                            text: t('event.manage.modification.alert.cancel'),
                            role: 'cancel'
                        },
                        {
                            text: t('event.manage.modification.alert.confirm'),
                            handler: () => {
                                confirmSubmit();
                            }
                        }
                    ]}
                    onDidDismiss={() => setShowAlert(false)}
                />
            </IonContent>
        </IonPage>
    );
};

export default ModifyEvent;
