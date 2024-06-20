import { IonContent, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";

import FavoriteEventsComponent from '../components/EventComponent/FavoriteEventsComponent';

const PageFavoris: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('favorite.title')}</HeaderTitle>
            <IonContent>
                <FavoriteEventsComponent />
            </IonContent>
        </IonPage>
    )
}

export default PageFavoris