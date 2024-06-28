import { IonContent, IonDatetime, IonLabel, IonSpinner, IonTabButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import '../../theme/Event/Events.css';
import EventCardComponent from '../../components/EventComponent/EventCardComponent';
import { AssosData, EventData } from '../../Tools/Interfaces/EventInterface';
import Api from '../../Tools/Api';

const EventsList: React.FC = () => {
    // Use for the translation
    const { t, i18n } = useTranslation();

    const [selectedEvents, setSelectedEvents] = useState<any[]>([]); // Array to store selected events

    const [eventsData, setEventData] = useState<EventData[]>([]);
    const [assosData, setAssosData] = useState<AssosData[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsData = await Api.event.get();
                setEventData(eventsData.reverse());

                const assosData = await Api.assos.get();
                setAssosData(assosData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const getAssoById = (id: string) => {
        return assosData.find(asso => asso.id === id);
    }

    const dates = eventsData?.map(event => ({
        date: event.date.split(' ')[0],
        textColor: '#ffff',
        backgroundColor: getAssoById(event.asso_id)?.color || 'var(--ion-color-primary)',
    })) || [];

    /**
     * Function to handle the change of a date in the calendar
     * @param event the onIonChange event
     */
    const handleDateChange = (event: CustomEvent) => {
        const selectedValue = event.detail.value;

        const eventsForSelectedDate = eventsData.filter(event => {
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
                    <EventCardComponent key={event.id} event={event} asso={getAssoById(event.asso_id)} />
                ))
                : (
                    <IonLabel className='center-screen title'>{t('events.no-events-calendar')}</IonLabel>
                )
            }
        </IonContent>
    );
};

export default EventsList;
