import { IonAlert, IonButton, IonContent, IonImg, IonLabel, IonPage, IonSegment, IonSegmentButton } from '@ionic/react'
import HeaderTitle from '../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import Events from './Event/Events';
import { useState } from 'react';

const Événements: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    const [filter, setFilter] = useState('futur');

    const handleFilterChange = (event: CustomEvent) => {
        setFilter(event.detail.value);
    };

    return (
        <IonPage>
            <HeaderTitle>{t('events.title')}</HeaderTitle>
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
            <IonContent>
                <Events filter={filter} />
            </IonContent>
        </IonPage>
    );
}

export default Événements