import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonRow, IonSpinner, IonTabButton } from "@ionic/react";
import { AssociationMainData } from "../../Tools/Interfaces/AssosInterface";
import { useEffect, useState } from "react";
import { getAllAssosMainInfos } from "../../Tools/APIFetch";
import { filterData } from "../../Tools/LocalStorage/AssoCalls";

const AssociationCards: React.FC<{segValue: string}> = ({segValue}) =>{
// Hooks updated with the assos information when the page is mounted
  const [data, setData] = useState<AssociationMainData[] | null>(null);
  const [filteredData, setFilteredData] = useState<AssociationMainData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllAssosMainInfos();
      setData(result);
      filterData(segValue, result, setFilteredData); // Initialize the result to the active associations
    }
    fetchData();
  }, []);

  useEffect(() => {
    if(data)
      {
        filterData(segValue, data, setFilteredData);
      }
  }, [segValue]);
    return (
        <IonContent>
        {
          filteredData ?
            <IonGrid className="asso-grid">
              <IonRow>

                {filteredData.map(value =>
                  <IonCol key={value.id} size="11" size-md="4" size-lg="2">
                    <IonCard className="asso-card" button={true} href={"/association/" + value.id}>
                      <img alt="logo" className="asso-image" src={"https://tekiens.net/data/"+value.id+"/logo-0.webp"} />
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
    );
}

export default AssociationCards;