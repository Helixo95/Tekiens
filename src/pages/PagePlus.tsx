import { IonContent, IonIcon, IonItem, IonList, IonPage } from '@ionic/react';
import HeaderTitle from '../components/HeaderTitle';
import { settingsOutline, logInOutline, happyOutline, helpCircleOutline, linkOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import '../theme/IconText.css'

function Plus() {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('plus.title')}</HeaderTitle>
            <IonContent>
                <IonList>
                    <IonItem routerLink='/paramètres'>
                        <IonIcon icon={settingsOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <div className="text">{t('settings.title')}</div>
                    </IonItem>
                    <IonItem routerLink='/connexion'>
                        <IonIcon icon={logInOutline} className="icon" />
                        &nbsp;
                        &nbsp;
                        <div className="text">{t('connexion.title')}</div>
                    </IonItem>
                    <IonItem routerLink='/app/plus'>
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
                    <IonItem routerLink='/liens' lines='none'>
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

export default Plus;