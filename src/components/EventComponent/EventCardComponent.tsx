import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonImg, IonLabel, IonRow } from '@ionic/react'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { AssosData, EventData } from '../../Tools/Interfaces/EventAndAssoInterface';
import '../../theme/Event/EventCard.css'
import { brightenColor, isColorDark } from '../../Tools/GeneralTools';


const EventCardComponent: React.FC<{ event: EventData, asso: AssosData | undefined }> = ({ event, asso }) => {
    // Used to translate the page
    const { i18n } = useTranslation();

    // When the event hasn't a poster
    const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png";

    return (
        <IonCard className='event-card' button={true} href={'/event/' + event.id} >
            <IonImg className='event-image' alt="" src={event.poster ? `${event.poster}?${Date.now()}` : `${placeholderImage}`} style={{ backgroundColor: asso?.color }} />
            <IonCardHeader>
                <IonCardTitle style={{ color: isColorDark(asso?.color) ? brightenColor(asso?.color) : asso?.color }}>{event.title}</IonCardTitle>
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
                            <div style={{ backgroundColor: asso?.color, width: '3px', height: '100%' }} />
                        </IonCol>

                        <IonCol>
                            <IonGrid style={{ 'textAlign': 'left' }}>
                                <IonRow className='info'>
                                    <IonLabel style={{ color: isColorDark(asso?.color) ? brightenColor(asso?.color) : asso?.color }}>{asso?.names[0]}</IonLabel>
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
    )
}

export default EventCardComponent