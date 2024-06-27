import { IonButton, IonContent, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonPage, IonToast } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const PageConnexion: React.FC = () => {
    // Use to translate the page
    const { t } = useTranslation();

    const history = useHistory();

    const { login } = useAuth();

    const [errorText, setErrorText] = useState('');
    const [assoId, setAssoId] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false); // State to control toast visibility

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
            /*
            try {
                console.log(password);

                const session = await ApiSession(assoId, password);

                console.log('Session ID:', session.id);
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                setErrorText('Failed to login');
            }*/
            if (password === 'baba') {
                login({ id: assoId });
                setAssoId('');
                setPassword('');
                setShowToast(true); // Show toast upon successful login
                history.push('/app/settings');
            }
            else {
                setErrorText('Wrong password')
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
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={t('connexion.toast.login')}
                    duration={2000}
                    swipeGesture="vertical"
                />
                <form onSubmit={handleLogin}>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('connexion.asso-id.label')}
                            labelPlacement="floating"
                            placeholder={t('connexion.asso-id.placeholder')}
                            name="assoId"
                            type='text'
                            clearInput={true}
                            onIonChange={(e) => setAssoId(e.detail.value!)}
                            value={assoId}
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
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            value={password}
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