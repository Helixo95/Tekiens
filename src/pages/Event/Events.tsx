import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonLabel, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTabButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SomeEventsData, ApiResponseEvents } from '../../Tools/Interfaces/EventInterface'

import '../../theme/Event/Events.css';


const ApiComponent: React.FC<{ apiHref: string }> = ({ apiHref }) => {
    // Use to translate the page
    const { t, i18n } = useTranslation();

    const [data, setData] = useState<SomeEventsData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('futur');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://tekiens.net/api/' + apiHref);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result: ApiResponseEvents = await response.json();

                const eventsWithAssociations: SomeEventsData[] = await Promise.all(result.data.map(async (event) => {
                    const associationResponse = await fetch(`https://tekiens.net/api/assos/${event.asso_id}`);
                    if (!associationResponse.ok) {
                        throw new Error(`Failed to fetch association ${event.asso_id}`);
                    }
                    const associationResult = await associationResponse.json();
                    return {
                        ...event,
                        associationName: associationResult.data.names[0], // Use the first name (assuming it's primary)
                        associationColor: associationResult.data.color,
                    };
                }));

                setData(eventsWithAssociations.reverse());

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filter]);

    if (loading) {
        return (
            // To center the loading circle
            <IonTabButton disabled>
                <IonSpinner name='circular' />
            </IonTabButton>
        );
    }

    /**
     * Method to return the filtered data depending of the user's choice
     * @returns return the filtered data depending of the user's choice
     */
    const getFilteredEvents = () => {
        const currentDate = new Date();
        switch (filter) {
            case 'futur':
                return data.filter(event => new Date(event.date + 'Z') > currentDate);
            case 'ongoing':
                return data.filter(event => {
                    const eventDate = new Date(event.date + 'Z');
                    return eventDate.toDateString() === currentDate.toDateString();
                });
            case 'past':
                return data.filter(event => new Date(event.date + 'Z') < currentDate);
            default:
                return data;
        }
    };

    const filteredEvents = getFilteredEvents();

    /**
     * Function to return a message if we don't have any events
     * @returns the message we need to display if we don't have any event
     */
    const noDataMessage = () => {
        switch (filter) {
            case 'futur':
                return (
                    <IonContent className='ion-padding'>
                        <h1 className='title'>{t('events.filter.futur.message.title')}</h1>
                        <div className='justify-text'><IonLabel>{t('events.filter.futur.message.text')}</IonLabel></div>
                    </IonContent>
                );
            case 'ongoing':
                return (
                    <IonContent className='ion-padding'>
                        <h1 className='title'>{t('events.filter.ongoing.message.title')}</h1>
                        <div className='justify-text'><IonLabel>{t('events.filter.ongoing.message.text')}</IonLabel></div>
                    </IonContent>
                );
            case 'past':
                return (
                    <IonContent className='ion-padding'>
                        <h1 className='title'>{t('events.filter.past.message.title')}</h1>
                        <div className='justify-text'><IonLabel>{t('events.filter.past.message.text')}</IonLabel></div>
                    </IonContent>
                );
            default:
                return (
                    <IonContent className='ion-padding'>
                        <h1 className='title'>{t('events.filter.all.message.title')}</h1>
                        <div className='justify-text'><IonLabel>{t('events.filter.all.message.text')}</IonLabel></div>
                    </IonContent>
                );
        }
    };

    const handleFilterChange = (event: CustomEvent) => {
        setFilter(event.detail.value);
    };

    return (
        <IonContent>
            <IonSegment scrollable={true} value={filter} onIonChange={handleFilterChange}>
                <IonSegmentButton value='futur'>
                    <IonLabel>{t('events.filter.futur.label')}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='ongoing'>
                    <IonLabel>{t('events.filter.ongoing.label')}</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='past'>
                    <IonLabel>{t('events.filter.past.label')}</IonLabel>
                </IonSegmentButton>

                <IonSegmentButton value='all'>
                    <IonLabel>{t('events.filter.all.label')}</IonLabel>
                </IonSegmentButton>
            </IonSegment>
            {filteredEvents.length > 0 ? (
                <IonGrid>
                    {filteredEvents.map((event: SomeEventsData) => (
                        <IonCard key={event.id} button={true} href={'/event/' + event.id}>
                            <img alt="" src={"https://tekiens.net/" + event.poster} />
                            <IonCardHeader>
                                <IonCardTitle>{event.title}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size='auto'>
                                            <IonGrid className='date-grid'>
                                                <IonRow className="ion-text-uppercase">{new Date(event.date + 'Z').toLocaleString(i18n.language, { month: 'short' })}</IonRow>
                                                <IonRow style={{ fontSize: '30px' }}>{new Date(event.date + 'Z').toLocaleString(i18n.language, { day: '2-digit' })}</IonRow>
                                                <IonRow>{new Date(event.date + 'Z').toLocaleString(i18n.language, { weekday: 'long' })}</IonRow>
                                            </IonGrid>
                                        </IonCol>

                                        <IonCol size='auto'>
                                            <div style={{ backgroundColor: event.associationColor, width: '3px', height: '100%' }} />
                                        </IonCol>

                                        <IonCol>
                                            <IonGrid className='infos-grid'>
                                                <IonRow className='info'>
                                                    <IonLabel style={{ color: event.associationColor }}>{event.associationName}</IonLabel>
                                                </IonRow>

                                                <IonRow className='info'>
                                                    <IonLabel>
                                                        📍&nbsp;
                                                        {event.place}
                                                    </IonLabel>
                                                </IonRow>

                                                <IonRow className='info'>
                                                    <IonLabel>
                                                        🕓&nbsp;
                                                        {new Date(event.date + 'Z').toLocaleString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                                                    </IonLabel>
                                                </IonRow>
                                            </IonGrid>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>


                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonGrid>
            ) : (
                noDataMessage()
            )}
        </IonContent>
    );
};

export default ApiComponent;
