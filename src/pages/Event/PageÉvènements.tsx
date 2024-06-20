import { IonPage } from '@ionic/react'
import HeaderTitle from '../../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import Events from './Events';

const Événements: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('events.title')}</HeaderTitle>
            <Events apiHref="events" />
        </IonPage>
    );
}

export default Événements