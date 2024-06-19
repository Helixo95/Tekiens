import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTabButton, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { getAllAssosMainInfos, getAssosFilteredInfos } from "../../Tools/APIFetch";
import { AssociationMainData } from "../../Tools/Interfaces/AssosInterface";
import HeaderTitle from "../../components/HeaderTitle";

import "../../theme/Association/Association.css";
import { filterData } from "../../Tools/LocalStorage/AssoCalls";
import AssociationCards from "./AssociationCards";
import { useTranslation } from "react-i18next";


const Associations: React.FC = () => { 
  const [desiredSeg, setDesiredSeg] = useState("active");
  const { t, i18n } = useTranslation();

  return (
    <IonPage>

      <HeaderTitle>Liste des associations</HeaderTitle>

      <IonSegment value={desiredSeg} onIonChange={(event: CustomEvent) => setDesiredSeg(event.detail.value)}>
        <IonSegmentButton value="active"><IonLabel>{t('associations.tab-active')}</IonLabel></IonSegmentButton>
        <IonSegmentButton value="over"><IonLabel>{t('associations.tab-over')}</IonLabel></IonSegmentButton>
        <IonSegmentButton value="all"><IonLabel>{t('associations.tab-all')}</IonLabel></IonSegmentButton>
      </IonSegment>

      <AssociationCards segValue={desiredSeg}/>
    </IonPage>
  );
};


export default Associations;

