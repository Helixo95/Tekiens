import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PageConnexion: React.FC = () => {
    // Use to translate the page
    const { t } = useTranslation();

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
            <HeaderTitleBack back='/app/settings'>{t('connexion.title')}</HeaderTitleBack>
            <IonContent className='ion-padding'>
                <form onSubmit={handleLogin}>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('connexion.asso-id.label')}
                            labelPlacement="floating"
                            placeholder={t('connexion.asso-id.placeholder')}
                            name="assoId"
                            type='text'
                            clearInput={true}
                        />
                    </IonItem>

                    <IonItem className='input-item'>
                        <IonInput
                            label={t('connexion.password.label')}
                            labelPlacement="floating"
                            placeholder={t('connexion.password.placeholder')}
                            name="password"
                            type='password'
                            clearInput={true}
                        />
                    </IonItem>

                    <IonButton type='submit' className='login-item' style={{ 'width': '100%' }}>{t('connexion.button')}</IonButton>
                    <span className='error center-screen'>{errorText}</span>
                </form>
            </IonContent>

        </IonPage >
    )
}

export default PageConnexion