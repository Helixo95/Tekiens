import { IonHeader, IonPage } from '@ionic/react';
import React from 'react'
import HeaderTitleBack from '../../components/HeaderTitleBack';




const EventNotification: React.FC = () => {

    return (
    <IonPage>
        <IonHeader>
            <HeaderTitleBack back="">Événement</HeaderTitleBack>
        </IonHeader>

    </IonPage>
    )
    ;
}


export default EventNotification;