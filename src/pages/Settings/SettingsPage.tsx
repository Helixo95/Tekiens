import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonToast } from '@ionic/react';
import HeaderTitle from '../../components/HeaderTitle';
import { constructOutline, logInOutline, happyOutline, helpCircleOutline, linkOutline, logOutOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import '../../theme/IconText.css'
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    const { logout, session } = useAuth();
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
                    message={t('login.toast.logout')}
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

                    {!session &&
                        <IonItem routerLink='/login'>
                            <IonIcon icon={logInOutline} className="icon" />
                            &nbsp;
                            &nbsp;
                            <IonLabel className="text">{t('login.title')}</IonLabel>
                        </IonItem>
                    }

                    {session &&
                        <IonItem routerLink={'/association/' + session.asso_id}>
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

                {session &&
                    <IonItem onClick={handleLogout} lines='none'>
                        <IonIcon icon={logOutOutline} className="icon" color='danger' />
                        &nbsp;
                        &nbsp;
                        <IonLabel className="text" color='danger'>{t('settings.logout')}</IonLabel>
                    </IonItem>
                }
            </IonContent>
        </IonPage >
    );
}

export default SettingsPage;