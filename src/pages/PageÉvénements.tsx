import { IonAlert, IonButton, IonContent, IonImg, IonPage } from '@ionic/react'
import HeaderTitle from '../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import Events from '../components/ApiEvents';

const Événements: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('evenements.title')}</HeaderTitle>
            <IonContent>
                <Events />
            </IonContent>
        </IonPage>
    );
}

export default Événements