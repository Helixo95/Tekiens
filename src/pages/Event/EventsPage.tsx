import { IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react'
import HeaderTitle from '../../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import EventsList from '../../components/EventComponent/EventsList';
import EventsCalendar from '../../components/EventComponent/EventsCalendar';
import { listOutline, calendarNumberOutline } from 'ionicons/icons';
import { useState } from 'react';

const EventsPage: React.FC = () => {
    // Used to translate the page
    const { t } = useTranslation();

    // useState to know if the user want to see the list or the calendar
    const [isList, setList] = useState(true);

    // When the user wants to change the event display method
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
                <EventsList />
                :
                <EventsCalendar />
            }
        </IonPage>
    );
}

export default EventsPage