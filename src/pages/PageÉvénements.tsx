import { IonContent, IonPage } from '@ionic/react'
import HeaderTitle from '../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import Events from './Event/Events';

const Événements: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('events.title')}</HeaderTitle>
            <IonContent>
                <Events apiHref="events" />
            </IonContent>
        </IonPage>
    );
}

export default Événements