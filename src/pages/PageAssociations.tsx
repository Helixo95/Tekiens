import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';
import { useTranslation } from 'react-i18next';

const Associations: React.FC = () => {
    // Use to translte the page
    const { t, i18n } = useTranslation();

    const [data, setData] = useState(null);
    let url = "https://tekiens.net/api/assos";

    const ButtonClicked = () => {
        fetch(url)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error))
    };

    return (
        <IonPage>
            <HeaderTitle>{t('associations.title')}</HeaderTitle>
            <IonContent>
                <IonButton onClick={ButtonClicked} color={'primary'}>
                    Chercher toutes les associations
                </IonButton>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : ""}
            </IonContent>
        </IonPage>
    );
}

export default Associations;