import { IonButton, IonButtons, IonContent, IonDatetime, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import '../../theme/Event/Events.css';
import useEventData from '../../Tools/EventApiCall';
import EventCardComponent from '../../components/EventComponent/EventCardComponent';

const EventsList: React.FC<{ apiHref: string }> = ({ apiHref }) => {
    // Use to translate the page
    const { t, i18n } = useTranslation();

    const [selectedEvents, setSelectedEvents] = useState<any[]>([]); // Array to store selected events

    const { data, loading } = useEventData(apiHref);

    const dates = data?.map(event => ({
        date: event.date.split(' ')[0],
        textColor: '#ffff',
        backgroundColor: event.associationColor || 'var(--ion-color-primary)',
    })) || [];

    if (loading) {
        return (
            <IonContent>
                {/*To center the loading circle*/}
                <IonTabButton disabled>
                    <IonSpinner name='circular' />
                </IonTabButton>
            </IonContent>
        );
    }

    /**
     * Function to handle the change of a date in the calendar
     * @param event the onIonChange event
     */
    const handleDateChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value;

        const eventsForSelectedDate = data.filter(event => {
            // Split the event.date to get the date part only
            const eventDate = event.date.split(' ')[0];
            return eventDate === selectedValue.split('T')[0];
        });

        setSelectedEvents(eventsForSelectedDate);
    };

    return (
        <IonContent className='ion-padding' >
            <IonDatetime
                highlightedDates={dates}
                presentation="date"
                locale={i18n.language}
                onIonChange={handleDateChange}
            />

            {selectedEvents.length > 0 ?
                selectedEvents.map(event => (
                    <EventCardComponent key={event.id} event={event} />
                ))
                : (
                    <IonLabel className='center-screen title'>{t('events.no-events-calendar')}</IonLabel>
                )
            }
        </IonContent>
    );
};

export default EventsList;
