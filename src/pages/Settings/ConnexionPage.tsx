import { IonButton, IonContent, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonPage, IonToast } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PageConnexion: React.FC = () => {
    // Used to translate the page
    const { t } = useTranslation();

    const history = useHistory();

    // Get the desire function from the context
    const { session, login } = useAuth();

    const [errorText, setErrorText] = useState('');
    const [assoId, setAssoId] = useState('');
    const [password, setPassword] = useState('');

    // State to control toast visibility
    const [showToast, setShowToast] = useState(false);

    // Reset the input value when we change page
    useEffect(() => {
        setAssoId('');
        setPassword('');
        setErrorText('');
    }, [history.location.pathname]);

    if (session) {
        history.goBack();
    }

    /**
     * Function when the user want to login
     * @param event the form submit event
     */
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form redirection
        event.preventDefault();

        const form = event.currentTarget;

        // We get the form values
        const values = Object.fromEntries(new FormData(form));

        // We get the association id and password
        const assoId = values.assoId as string;
        const password = values.password as string;

        try {
            await login(assoId, password);

            // Reset the inputs value
            setErrorText('');
            setAssoId('');
            setPassword('');

            // Show toast upon successful login
            setShowToast(true);
            history.goBack();
        } catch (error: any) {
            if (error instanceof Error) {
                setErrorText(error.message);
            }
            else {
                setErrorText("Error while login, try again");
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
                            required
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
                            required
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