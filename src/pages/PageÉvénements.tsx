import { IonAlert, IonButton, IonContent, IonImg, IonLabel, IonPage, IonSegment, IonSegmentButton } from '@ionic/react'
import HeaderTitle from '../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import Events from './Event/Events';
import { useState } from 'react';

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