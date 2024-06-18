import { IonContent, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonSelect, IonSelectOption, IonToggle } from "@ionic/react"
import { earthOutline, notificationsOutline, schoolOutline, colorPaletteOutline } from "ionicons/icons";
import HeaderTitleBack from "../components/HeaderTitleBack";
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import '../theme/IconText.css'

const Paramètres: React.FC = () => {
    const { theme, setTheme } = useTheme();

    // Use to translate the page and change the language
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <IonPage>
            <HeaderTitleBack back='/app/plus'>{t('parametres.title')}</HeaderTitleBack>

            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel className="test">
                        <IonIcon icon={notificationsOutline} className="icon" />
                        &nbsp;
                        <div className="text">{t('parametres.notifications.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                    <IonToggle>{t('parametres.notifications.text')}</IonToggle>
                </IonItem>
            </IonItemGroup>

            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>
                        <IonIcon icon={earthOutline} className="icon" />
                        &nbsp;
                        <div className="text">{t('parametres.langue.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                    <IonSelect value={i18n.language} onIonChange={(e) => changeLanguage(e.detail.value)}>
                        <IonSelectOption value="fr">Français</IonSelectOption>
                        <IonSelectOption value="en">English</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonItemGroup>

            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>
                        <IonIcon icon={colorPaletteOutline} className="icon" />
                        &nbsp;
                        <div className="text">{t('parametres.apparence.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                    <IonSelect value={theme} onIonChange={(e) => setTheme(e.detail.value)}>
                        <IonSelectOption value="">{t('parametres.apparence.theme.defaut')}</IonSelectOption>
                        <IonSelectOption value="theme-dark">Thème dark</IonSelectOption>
                        <IonSelectOption value="theme-bleu">Thème bleu</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonItemGroup>

            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>
                        <IonIcon icon={schoolOutline} className="icon" />
                        <div className="text">&nbsp;{t('parametres.campus.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                    <IonSelect label={t('parametres.campus.label')}>
                        <IonSelectOption value="parc">{t('parametres.campus.site.parc')}</IonSelectOption>
                        <IonSelectOption value="saint-martin">{t('parametres.campus.site.saint-martin')}</IonSelectOption>
                        <IonSelectOption value="neuville">{t('parametres.campus.site.neuville')}</IonSelectOption>
                        <IonSelectOption value="chenes">{t('parametres.campus.site.chenes')}</IonSelectOption>
                        <IonSelectOption value="pau">{t('parametres.campus.site.pau')}</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonItemGroup>

            <IonContent className="ion-padding" />
        </IonPage >
    )
}

export default Paramètres;