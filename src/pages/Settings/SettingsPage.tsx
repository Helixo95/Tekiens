import { IonContent, IonIcon, IonItem, IonList, IonPage } from '@ionic/react';
import HeaderTitle from '../../components/HeaderTitle';
import { constructOutline, logInOutline, happyOutline, helpCircleOutline, linkOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import '../../theme/IconText.css'

const SettingsPage: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('settings.title')}</HeaderTitle>
            <IonContent>
                <IonList>
                    <IonItem routerLink='/preferences'>
                        <IonIcon icon={constructOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <div className="text">{t('preferences.title')}</div>
                    </IonItem>
                    <IonItem routerLink='/connexion'>
                        <IonIcon icon={logInOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <div className="text">{t('connexion.title')}</div>
                    </IonItem>
                    <IonItem routerLink='/createEvent'>
                        <IonIcon icon={happyOutline} />
                        &nbsp;
                        &nbsp;
                        <div className="text">{t('my-association.title')}</div>
                    </IonItem>
                    <IonItem routerLink='/faq'>
                        <IonIcon icon={helpCircleOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <div className="text">{t('faq.title')}</div>
                    </IonItem>
                    <IonItem routerLink='/links' lines='none'>
                        <IonIcon icon={linkOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <div className="text">{t('schools-links.title')}</div>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage >
    );
}

export default SettingsPage;