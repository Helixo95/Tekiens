import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { useState } from 'react';

const PageConnexion: React.FC = () => {

    const [errorText, setErrorText] = useState('');

    const handleLogin = async (event: { preventDefault: () => void; currentTarget: any; }) => {
        event.preventDefault();

        const form = event.currentTarget;
        const values = Object.fromEntries(new FormData(form));

        const assoId = values.assoId as string;
        const password = values.password as string;

        if (assoId === '' && password === '') {
            setErrorText('Missings parameters')
        }
        else if (assoId === '') {
            setErrorText('Missing associations ID')
        }
        else if (password === '') {
            setErrorText('Missing password')
        }
        else {
            setErrorText('')
            try {
                console.log(password);

                const session = await ApiSession(assoId, password);

                console.log('Session ID:', session.id);
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                setErrorText('Failed to login');
            }
        }
    }

    const ApiSession = async (assoId: string, hashPassword: string): Promise<any> => {
        try {
            const response = await fetch(`https://tekiens.net/api/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asso: assoId,
                    hash: hashPassword,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create session');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating session:', error);
            throw new Error('Failed to create session');
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