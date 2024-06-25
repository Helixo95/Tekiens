import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react'
import HeaderTitleBack from '../components/HeaderTitleBack'

const PageConnexion = () => {
    return (
        <IonPage>
            <HeaderTitleBack back='/app/plus'>Connexion</HeaderTitleBack>
            <IonContent className='ion-padding'>
                <div className='center-screen'>
                    <IonLabel className='title' style={{ 'font-size': '200%', 'margin-bottom': '10%' }}>Connexion</IonLabel>
                    <IonInput label="Id de l'association" labelPlacement="floating" placeholder="Saisir l'id de l'association" type='text' clearInput={true} fill="outline" className='login-item' />
                    <IonInput label="Mot de passe" labelPlacement="floating" placeholder="Saisir le mot de passe" type='password' clearInput={true} fill="outline" className='login-item' />
                    <IonButton className='login-item' style={{ 'width': '100%' }}>Se connecter</IonButton>
                    <span className='error'>fsd</span>
                </div>
            </IonContent>

        </IonPage>
    )
}

export default PageConnexion