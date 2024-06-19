import { IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";

const PageFavoris: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('favorites.title')}</HeaderTitle>
        </IonPage>
    )
}

export default PageFavoris