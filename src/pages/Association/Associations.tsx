import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonSpinner, IonTabButton, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { getAssosMainInfos } from "../../Tools/APIFetch";
import { AssociationMainData } from "../../Tools/Interfaces/AssosInterface";

import "../../theme/Association/Association.css";
import HeaderTitle from "../../components/HeaderTitle";

const Associations: React.FC = () => {
  // Hooks updated with the assos information when the page is mounted
  const [data, setData] = useState<AssociationMainData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAssosMainInfos();
      setData(result);
    }
    fetchData();
    console.log("Test");
  }, []);


  return (
    <IonPage>

      <HeaderTitle>Liste des associations</HeaderTitle>

      <IonContent fullscreen>
        {
          data ?
            <IonGrid className="asso-grid">
              <IonRow>

                {data.map(value =>
                  <IonCol key={value.id} size="11" size-md="4" size-lg="2">
                    <IonCard className="asso-card" button={true} href={"/association/" + value.id}>
                      <IonImg alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                      <IonCardHeader>
                        <IonCardTitle style={{ color: value.color }} className="asso-title">{value.name[0]}</IonCardTitle>
                        <IonCardSubtitle style={{ color: value.color }} className="assos-sub">{value.theme}</IonCardSubtitle>
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

