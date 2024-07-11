import { IonContent, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonPage, IonSelect, IonSelectOption, IonToggle, ToggleCustomEvent } from "@ionic/react"
import { earthOutline, notificationsOutline, schoolOutline, colorPaletteOutline } from "ionicons/icons";
import HeaderTitleBack from "../../components/HeaderTitleBack";
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import '../../theme/IconText.css'
import { useState } from "react";

const PreferencesPage: React.FC = () => {
    const { color, setColor, darkTheme, setDarkTheme } = useTheme();

    // Use for the translation and change the language
    const { t, i18n } = useTranslation();

    const toggleChange = (ev: ToggleCustomEvent) => {
        setDarkTheme(ev.detail.checked + '');
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    const changeCampus = (selectedCampus: string) => {
        localStorage.setItem('selectedCampus', selectedCampus);
    };

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
                    <IonToggle>{t('preferences.notifications.text')}</IonToggle>
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
                    <IonSelect label={t('preferences.language.label')} value={i18n.language} onIonChange={(e) => changeLanguage(e.detail.value)}>
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
                    <IonToggle checked={stringToBoolean(darkTheme)} onIonChange={toggleChange} justify="space-between">
                        {t('preferences.appearance.theme')}
                    </IonToggle>
                </IonItem>

                <IonItem lines="none">
                    <IonSelect label={t('preferences.appearance.color.label')} value={color} onIonChange={(e) => setColor(e.detail.value)}>
                        <IonSelectOption value="">{t('preferences.appearance.color.colors.default')}</IonSelectOption>
                        <IonSelectOption value="green-color">{t('preferences.appearance.color.colors.green')}</IonSelectOption>
                        <IonSelectOption value="blue-color">{t('preferences.appearance.color.colors.blue')}</IonSelectOption>
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