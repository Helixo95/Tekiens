import { IonContent, IonInput, IonPage } from '@ionic/react'
import HeaderTitleBack from '../components/HeaderTitleBack'

const PageConnexion = () => {
    return (
        <IonPage>
            <HeaderTitleBack back='/app/plus'>Connexion</HeaderTitleBack>
            <IonContent>
                <IonInput label="Outline input" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>
                <IonInput label="Solid input" labelPlacement="floating" fill="solid" placeholder="Enter text"></IonInput>
            </IonContent>
        </IonPage>
    )
}

export default PageConnexion