import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTabBar } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import FavoriteEventsComponent from '../components/EventComponent/FavoriteEventsComponent';
import AssociationCards from "./Association/AssociationCards";
import { useState } from "react";

const PageFavoris: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    const [desiredSeg, setDesiredSeg] = useState("assos");
    const emptyTitle = t('favorite.filter.assos.message.title');
    const emptyMessage = t('favorite.filter.assos.message.text');

    return (
        <IonPage>
            <IonSegment value={desiredSeg} onIonChange={(event: CustomEvent) => setDesiredSeg(event.detail.value)}>
                <IonSegmentButton value="assos"><IonLabel>{t('favorite.filter.assos.label')}</IonLabel></IonSegmentButton>
                <IonSegmentButton value="events"><IonLabel>{t('favorite.filter.events.label')}</IonLabel></IonSegmentButton>
            </IonSegment>
            <HeaderTitle>{t('favorite.title')}</HeaderTitle>
            <IonContent>
                {desiredSeg == "assos" ?
                    <AssociationCards segValue={"sub"} emptyTitle={emptyTitle} emptyMessage={emptyMessage}/> :
                    <FavoriteEventsComponent />}
            </IonContent>
        </IonPage>
    )
}

export default PageFavoris