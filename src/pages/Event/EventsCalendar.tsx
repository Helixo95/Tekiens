import { IonContent, IonDatetime, IonIcon, IonLabel, IonRefresher, IonRefresherContent, IonSpinner, IonTabButton, RefresherEventDetail } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import '../../theme/Event/Events.css';
import EventCardComponent from '../../components/EventComponent/EventCardComponent';
import { AssosData, EventData } from '../../Tools/Interfaces/EventAndAssoInterface';
import Api from '../../Tools/Api';
import HeaderTitle from '../../components/HeaderTitle';
import { help, searchOutline } from 'ionicons/icons';
import { filterByCampus } from '../../Tools/LocalStorage/LocalStorageEvents';

const EventsList: React.FC = () => {
    // Used to translate the page
    const { t, i18n } = useTranslation();

    const [selectedEvents, setSelectedEvents] = useState<any[]>([]); // Array to store selected events

    const [eventsData, setEventData] = useState<EventData[]>([]);
    const [assosData, setAssosData] = useState<AssosData[]>([]);

    const [loading, setLoading] = useState(true);

    // We get all the events and associations
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

    useEffect(() => {
        fetchData();
    }, []);

    // Loading appears while waiting for data
    if (loading) {
        return (
            <IonContent>
                <IonTabButton disabled>
                    <IonSpinner name='circular' />
                </IonTabButton>
            </IonContent>
        );
    }

    // Function if the user want to reload the page
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData().then(() => event.detail.complete());
    }

    // We check if we have the data we want
    if (!eventsData) {
        return (
            <>
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

    const filteredEventsData = filterByCampus(eventsData, assosData);

    // We get an association by its id
    const getAssoById = (id: string) => {
        return assosData.find(asso => asso.id === id);
    }

    // We change the color of the date in calandar depending of the association color
    const dates = filteredEventsData?.map(event => ({
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

        const eventsForSelectedDate = filteredEventsData.filter(event => {
            // Split the event.date to get the date part only
            const eventDate = event.date.split(' ')[0];
            return eventDate === selectedValue.split('T')[0];
        });

        setSelectedEvents(eventsForSelectedDate);
    };

    return (
        <IonContent className='ion-padding' >
            <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
                <IonRefresherContent />
            </IonRefresher>

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
                    <IonLabel className='center-screen-padding title'>{t('events.no-events-calendar')}</IonLabel>
                )
            }
        </IonContent>
    );
};

export default EventsList;
