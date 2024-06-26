import { IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react'
import HeaderTitle from '../../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import EventsList from './EventsList';
import EventsCalendar from './EventsCalendar';
import { listOutline, calendarNumberOutline } from 'ionicons/icons';
import { useState } from 'react';

const EventsPage: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    const [isList, setList] = useState(true);

    const handleEventsChange = () => {
        setList((current) => !current);
    }

    return (
        <IonPage>
            <HeaderTitle>{isList ? t('events.title.list') : t('events.title.calendar')}</HeaderTitle>
            <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonFabButton onClick={handleEventsChange}>
                    <IonIcon icon={isList ? calendarNumberOutline : listOutline}></IonIcon>
                </IonFabButton>
            </IonFab>
            {isList ?
                <EventsList apiHref="events" />
                :
                <EventsCalendar apiHref="events" />
            }
        </IonPage>
    );
}

export default EventsPage