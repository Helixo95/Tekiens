import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { useState } from 'react';

const PageConnexion: React.FC = () => {

    const [errorText, setErrorText] = useState('');

    const handleLogin = (event: { preventDefault: () => void; currentTarget: any; }) => {
        event.preventDefault();

        const form = event.currentTarget;
        const values = Object.fromEntries(new FormData(form));

        if (values.assoId === '' && values.password === '') {
            setErrorText('Missings parameters')
        }
        else if (values.assoId === '') {
            setErrorText('Missing associations ID')
        }
        else if (values.password === '') {
            setErrorText('Missing password')
        }
        else {
            setErrorText('')
        }
    }


    return (
        <IonPage>
            <HeaderTitleBack back='/app/plus'>Connexion</HeaderTitleBack>
            <IonContent className='ion-padding'>
                <form className='center-screen' onSubmit={handleLogin}>
                    <IonLabel className='title' style={{ 'fontSize': '200%', 'marginBottom': '10%' }}>Connexion</IonLabel>
                    <IonInput
                        label="Id de l'association"
                        labelPlacement="floating"
                        placeholder="Saisir l'id de l'association"
                        name="assoId"
                        type='text'
                        clearInput={true}
                        fill="outline"
                        className='login-item'
                    />

                    <IonInput
                        label="Mot de passe"
                        labelPlacement="floating"
                        placeholder="Saisir le mot de passe"
                        name="password"
                        type='password'
                        clearInput={true}
                        fill="outline"
                        className='login-item'
                    />

                    <IonButton type='submit' className='login-item' style={{ 'width': '100%' }} >Se connecter</IonButton>
                    <span className='error'>{errorText}</span>
                </form>
            </IonContent>

        </IonPage>
    )
}

export default PageConnexion