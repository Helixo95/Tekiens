import { IonContent, IonItem, IonList, IonPage } from "@ionic/react"
import HeaderTitleBack from "../../components/HeaderTitleBack";
import { useTranslation } from "react-i18next";

const LinksPage: React.FC = () => {
    // Used to translate the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitleBack back='/app/settings'>{t('schools-links.title')}</HeaderTitleBack>

            <IonList>
                <IonItem href='https://cytech.cyu.fr/' target="_blank" rel="noreferrer">
                    <img height={20} width={20} src="https://cytech.cyu.fr/uas/CYTech/FAVICON/Tampon-CY-Tech+(1).png" />
                    &nbsp;
                    &nbsp;
                    {t('schools-links.link.site')}
                </IonItem>

                <IonItem href='https://mycy.cyu.fr/' target="_blank" rel="noreferrer">
                    <img height={20} width={20} src="https://mycy.cyu.fr/assets/img/favicon.png" />
                    &nbsp;
                    &nbsp;
                    {t('schools-links.link.mycy')}
                </IonItem>

                <IonItem href='https://services-web.cyu.fr/calendar' target="_blank" rel="noreferrer">
                    <img height={20} width={20} src="https://mycy.cyu.fr/assets/img/favicon.png" />
                    &nbsp;
                    &nbsp;
                    {t('schools-links.link.celcat')}
                </IonItem>

                <IonItem href='https://cours.cyu.fr/' target="_blank" rel="noreferrer">
                    <img height={20} width={20} src="https://cours.cyu.fr/theme/image.php/boost_union/theme/1718174755/favicon" />
                    &nbsp;
                    &nbsp;
                    {t('schools-links.link.cours')}
                </IonItem>

                <IonItem href='https://glpi.cy-tech.fr/' target="_blank" rel="noreferrer">
                    <img height={20} width={20} src="https://glpi.cy-tech.fr/pics/favicon.ico" />
                    &nbsp;
                    &nbsp;
                    {t('schools-links.link.glpi')}
                </IonItem>

                <IonItem href='https://doc.cy-tech.fr/' target="_blank" rel="noreferrer0" lines="none">
                    <img height={20} width={20} src="https://doc.cy-tech.fr/favicon.png" />
                    &nbsp;
                    &nbsp;
                    {t('schools-links.link.doc')}
                </IonItem>

            </IonList>

            <IonContent className="ion-padding" />
        </IonPage >
    )
}

export default LinksPage;