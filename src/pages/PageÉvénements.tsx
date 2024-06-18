import { IonAlert, IonButton, IonContent, IonImg, IonLabel, IonPage, IonSegment, IonSegmentButton } from '@ionic/react'
import HeaderTitle from '../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import Events from './Event/Events';

const Événements: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('evenements.title')}</HeaderTitle>
            <IonSegment value='all'>
                <IonSegmentButton value='all'>
                    <IonLabel>Tous</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='past'>
                    <IonLabel>Passés</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='now'>
                    <IonLabel>En cours</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='future'>
                    <IonLabel>Futurs</IonLabel>
                </IonSegmentButton>
            </IonSegment>
            <IonContent>
                <Events />
            </IonContent>
        </IonPage>
    );
}

export default Événements