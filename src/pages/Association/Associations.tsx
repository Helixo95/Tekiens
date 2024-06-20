import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSpinner, IonTabButton, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { getAllAssosMainInfos, getAssosFilteredInfos } from "../../Tools/APIFetch";
import { AssociationMainData } from "../../Tools/Interfaces/AssosInterface";
import HeaderTitle from "../../components/HeaderTitle";

import "../../theme/Association/Association.css";
import { useTranslation } from "react-i18next";

function filterData(filterChoice: string, data: any, callback: Function) {
  if (!data) {
    return;
  }

  if (filterChoice == 'all') {
    callback(data);
    return;
  }

  const bChooseActive = filterChoice == 'active';
  let result = data.filter((currentData: any) => bChooseActive ? currentData.end === null : currentData.end !== null);

  console.log(result)
  callback(result);
}

const Associations: React.FC = () => {
  // Use to translate the page
  const { t } = useTranslation();

  // Hooks updated with the assos information when the page is mounted
  const [data, setData] = useState<AssociationMainData[] | null>(null);
  const [filtereddata, setFilteredData] = useState<AssociationMainData[] | null>(null);
  const [segValue, setSegValue] = useState("active");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAssosMainInfos();
      setData(result);
      filterData('active', result, setFilteredData);
      console.log(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    filterData(segValue, data, setFilteredData);
  }, [segValue]);

  return (
    <IonPage>

      <HeaderTitle>{t('associations.title')}</HeaderTitle>

      <IonSegment value={segValue} onIonChange={(event: CustomEvent) => setSegValue(event.detail.value)}>
        <IonSegmentButton value="active"><IonLabel>Active</IonLabel></IonSegmentButton>
        <IonSegmentButton value="over"><IonLabel>Over</IonLabel></IonSegmentButton>
        <IonSegmentButton value="all"><IonLabel>All</IonLabel></IonSegmentButton>
      </IonSegment>

      <IonContent>
        {
          filtereddata ?
            <IonGrid className="asso-grid">
              <IonRow>

                {filtereddata.map(value =>
                  <IonCol key={value.id} size="11" size-md="4" size-lg="2">
                    <IonCard className="asso-card" button={true} href={"/association/" + value.id}>
                      <img alt="logo" className="asso-image" src={"https://tekiens.net/data/" + value.id + "/logo-0.webp"} />
                      <IonCardHeader>
                        <IonCardTitle style={{ color: value.color }} className="card-asso-title">{value.names[0]}</IonCardTitle>
                        <IonCardSubtitle style={{ color: value.color }} className="card-assos-sub">{value.theme}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>
                  </IonCol>
                )}
              </IonRow>
            </IonGrid>
            :
            <IonContent>
              <IonTabButton disabled>
                <IonSpinner name="circular"></IonSpinner>
              </IonTabButton>
            </IonContent>
        }
      </IonContent>
    </IonPage>
  );
};


export default Associations;

