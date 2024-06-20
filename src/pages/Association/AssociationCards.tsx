import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonLabel, IonRow, IonSpinner, IonTabButton, IonTitle } from "@ionic/react";
import { AssociationMainData } from "../../Tools/Interfaces/AssosInterface";
import { useEffect, useState } from "react";
import { getAllAssosMainInfos } from "../../Tools/APIFetch";
import { filterData } from "../../Tools/LocalStorage/AssoCalls";
import { useTranslation } from "react-i18next";
import "../../theme/Association/Association.css";

const AssociationCards: React.FC<{ segValue: string }> = ({ segValue }) => {
  // Hooks updated with the assos information when the page is mounted
  const [data, setData] = useState<AssociationMainData[] | null>(null);
  const [filteredData, setFilteredData] = useState<AssociationMainData[] | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAssosMainInfos();
      setData(result);
      filterData(segValue, result, setFilteredData); // Initialize the result to the active associations
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      filterData(segValue, data, setFilteredData);
    }
  }, [segValue]);

  return (
    <>
      {
        filteredData ?
          filteredData.length > 0 ?
            <IonGrid className="asso-grid">
              <IonRow>
                {
                  filteredData.map(value =>
                    <IonCol key={value.id} size="11" size-md="4" size-lg="2">
                      <IonCard className="asso-card" button={true} href={"/association/" + value.id}>
                        <img alt="logo" className="asso-image-size" src={"https://tekiens.net/data/" + value.id + "/logo-0.webp"} style={{ width: '100%' }} />
                        <IonCardHeader>
                          <IonCardTitle style={{ color: value.color }} className="card-asso-title">{value.names[0]}</IonCardTitle>
                          <IonCardSubtitle style={{ color: value.color }} className="card-assos-sub">{value.theme}</IonCardSubtitle>
                        </IonCardHeader>
                      </IonCard>
                    </IonCol>)
                }
              </IonRow>
            </IonGrid> :

            <div className="ion-padding all-screen-swipe">
              <h1 className="title">{t('favorite.filter.assos.message.title')}</h1>
              <div className="justify-text"><IonLabel>{t('favorite.filter.assos.message.text')}</IonLabel></div>
            </div>

          :
          <IonContent>
            <IonTabButton disabled>
              <IonSpinner name="circular"></IonSpinner>
            </IonTabButton>
          </IonContent>
      }
    </>
  );
}

export default AssociationCards;