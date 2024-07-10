import { IonButton, IonContent, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonPage, IonToast } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PageConnexion: React.FC = () => {
    // Use for the translation
    const { t } = useTranslation();

    const history = useHistory();

    const { login } = useAuth();

    const [errorText, setErrorText] = useState('');
    const [assoId, setAssoId] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false); // State to control toast visibility

    useEffect(() => {
        setAssoId('');
        setPassword('');
        setErrorText('');
    }, [history.location.pathname]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
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

            try {
                await login(assoId, password);

                setErrorText('');
                setAssoId('');
                setPassword('');
                setShowToast(true); // Show toast upon successful login
                history.push('/app/settings');
            } catch (error: any) {
                if (error instanceof Error) {
                    setErrorText(error.message);
                }
                else {
                    setErrorText("Error while login, try again");
                }
            }
        }
    }

    return (
        <IonPage>
            <HeaderTitleBack back='/app/settings'>{t('login.title')}</HeaderTitleBack>
            <IonContent className='ion-padding'>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={t('login.toast.login')}
                    duration={2000}
                    swipeGesture="vertical"
                />
                <form onSubmit={handleLogin}>

                    <IonItem className="input-item">
                        <IonInput
                            label={t('login.asso-id.label')}
                            labelPlacement="floating"
                            placeholder={t('login.asso-id.placeholder')}
                            name="assoId"
                            type='text'
                            clearInput={true}
                            onIonChange={(e) => setAssoId(e.detail.value!)}
                            value={assoId}
                        />
                    </IonItem>

                    <IonItem className='input-item'>
                        <IonInput
                            label={t('login.password.label')}
                            labelPlacement="floating"
                            placeholder={t('login.password.placeholder')}
                            name="password"
                            type='password'
                            clearInput={true}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            value={password}
                        />
                    </IonItem>

                    <IonButton type='submit' className='login-item' style={{ 'width': '100%' }}>{t('login.button')}</IonButton>
                    <span className='error center-screen-padding'>{errorText}</span>
                </form>
            </IonContent>

        </IonPage >
    )
}

export default PageConnexion