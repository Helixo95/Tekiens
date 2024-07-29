import { IonCheckbox, IonContent, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonSelect, IonSelectOption, IonToggle, ToggleCustomEvent } from "@ionic/react"
import { earthOutline, notificationsOutline, schoolOutline, colorPaletteOutline, notificationsOffOutline } from "ionicons/icons";
import HeaderTitleBack from "../../components/HeaderTitleBack";
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import '../../theme/IconText.css'
import { useEffect, useState } from "react";
import { askUserForNotification, checkNotificationPermission } from "../../Tools/NotificationsHandler";

const PreferencesPage: React.FC = () => {
    const { color, setColor, darkTheme, setDarkTheme } = useTheme();

    // Used to translate the page and change the language
    const { t, i18n } = useTranslation();
    const [bNotificationEnbable, setNotificationEnable] = useState<boolean>(false);

    /** Initialise notification value */
    useEffect(() => {
        const checkForNotification = async () => {
            const value = await checkNotificationPermission();
            setNotificationEnable(value);
        }

        checkForNotification();
    }, [])



    /**
     * Function to update the dark theme
     * @param event the toggle event 
     */
    const toggleChange = (event: ToggleCustomEvent) => {
        setDarkTheme(event.detail.checked + '');
    };

    /**
     * Function to update the selected language
     * @param lng the language the user selected
     */
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    /**
     * Function to update the selected campus
     * @param selectedCampus the campus the user selected
     */
    const changeCampus = (selectedCampus: string) => {
        localStorage.setItem('selectedCampus', selectedCampus);
    };

    /**
     * Function to transform a string to a boolean
     * @param value the string we want to convert
     * @returns true if we have "true" and false if not
     */
    const stringToBoolean = (value: string): boolean => {
        return value.toLowerCase() === 'true';
    };

    return (
        <IonPage>
            <HeaderTitleBack back='/app/settings'>{t('preferences.title')}</HeaderTitleBack>

            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel className="test">
                        <IonIcon icon={notificationsOutline} className="icon" />
                        &nbsp;
                        <div className="text">{t('preferences.notifications.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                    <IonLabel>{t('preferences.notifications.text')}</IonLabel>
                    <IonIcon slot="end" icon={bNotificationEnbable ? notificationsOutline : notificationsOffOutline} />
                </IonItem>
            </IonItemGroup>

            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>
                        <IonIcon icon={earthOutline} className="icon" />
                        &nbsp;
                        <div className="text">{t('preferences.language.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                    <IonSelect label={t('preferences.language.label')} value={i18n.language || 'fr'} onIonChange={(e) => changeLanguage(e.detail.value)}>
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
                        <div className="text">{t('preferences.appearance.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem>
                    <IonToggle checked={stringToBoolean(darkTheme)} onIonChange={toggleChange} justify="space-between" enableOnOffLabels>
                        {t('preferences.appearance.theme')}
                    </IonToggle>
                </IonItem>

                <IonItem lines="none">
                    <IonSelect label={t('preferences.appearance.color.label')} value={color} onIonChange={(e) => setColor(e.detail.value)}>
                        <IonSelectOption value="">{t('preferences.appearance.color.colors.default')}</IonSelectOption>
                        <IonSelectOption value="green-color">{t('preferences.appearance.color.colors.green')}</IonSelectOption>
                        <IonSelectOption value="cyje-color">{t('preferences.appearance.color.colors.cyje')}</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonItemGroup>

            <IonItemGroup>
                <IonItemDivider>
                    <IonLabel>
                        <IonIcon icon={schoolOutline} className="icon" />
                        <div className="text">&nbsp;{t('preferences.campus.title')}</div>
                    </IonLabel>
                </IonItemDivider>

                <IonItem lines="none">
                    <IonSelect label={t('preferences.campus.label')} value={localStorage.getItem('selectedCampus') || "all"} onIonChange={(e) => changeCampus(e.detail.value)}>
                        <IonSelectOption value="all">{t('preferences.campus.site.all')}</IonSelectOption>
                        <IonSelectOption value="Cergy">{t('preferences.campus.site.cergy')}</IonSelectOption>
                        <IonSelectOption value="Pau">{t('preferences.campus.site.pau')}</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonItemGroup>

            <IonContent className="ion-padding" />
        </IonPage >
    )
}

export default PreferencesPage;