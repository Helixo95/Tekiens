import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonToast } from '@ionic/react';
import HeaderTitle from '../../components/HeaderTitle';
import { constructOutline, logInOutline, happyOutline, helpCircleOutline, linkOutline, logOutOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import '../../theme/IconText.css'
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const SettingsPage: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    const { isAuthenticated, logout, session } = useAuth();
    const [showLogoutToast, setShowLogoutToast] = useState(false);

    const handleLogout = () => {
        logout();
        setShowLogoutToast(true);
    };

    return (
        <IonPage>
            <HeaderTitle>{t('settings.title')}</HeaderTitle>
            <IonContent>
                <IonToast
                    isOpen={showLogoutToast}
                    onDidDismiss={() => setShowLogoutToast(false)}
                    message={t('connexion.toast.logout')}
                    duration={2000}
                    swipeGesture="vertical"
                />

                <IonList>
                    <IonItem routerLink='/preferences'>
                        <IonIcon icon={constructOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <IonLabel className="text">{t('preferences.title')}</IonLabel>
                    </IonItem>

                    {!isAuthenticated &&
                        <IonItem routerLink='/connexion'>
                            <IonIcon icon={logInOutline} className="icon" />
                            &nbsp;
                            &nbsp;
                            <IonLabel className="text">{t('connexion.title')}</IonLabel>
                        </IonItem>
                    }

                    {isAuthenticated && session &&
                        <IonItem routerLink={'/association/' + session.id}>
                            <IonIcon icon={happyOutline} />
                            &nbsp;
                            &nbsp;
                            <IonLabel className="text">{t('my-association.title')}</IonLabel>
                        </IonItem>
                    }

                    <IonItem routerLink='/faq'>
                        <IonIcon icon={helpCircleOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <IonLabel className="text">{t('faq.title')}</IonLabel>
                    </IonItem>

                    <IonItem routerLink='/links' lines='none'>
                        <IonIcon icon={linkOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <IonLabel className="text">{t('schools-links.title')}</IonLabel>
                    </IonItem>
                </IonList>

                {isAuthenticated &&
                    <IonItem onClick={handleLogout} lines='none'>
                        <IonIcon icon={logOutOutline} className="icon" color='danger' />
                        &nbsp;
                        &nbsp;
                        <IonLabel className="text" color='danger'>Déconnexion</IonLabel>
                    </IonItem>
                }
            </IonContent>
        </IonPage >
    );
}

export default SettingsPage;