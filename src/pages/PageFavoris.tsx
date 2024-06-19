import { IonContent, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import AssociationCards from "./Association/AssociationCards";
import Events from "./Event/Events";

const PageFavoris: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitle>{t('favorite.title')}</HeaderTitle>
            <IonContent >
                <AssociationCards segValue={"sub"} />
                <Events apiHref="events" showFavorites={true} />
            </IonContent>
        </IonPage>
    )
}

export default PageFavoris