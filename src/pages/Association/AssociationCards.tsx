import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonRow, IonSpinner, IonTabButton, IonTitle } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../theme/Association/Association.css";
import { AssosData } from "../../Tools/Interfaces/EventAndAssoInterface";
import Api from "../../Tools/Api";
import { filterData } from "../../Tools/AssosTools";
import { help, searchOutline } from "ionicons/icons";

const AssociationCards: React.FC<{ segValue: string }> = ({ segValue }) => {
  // Use for the translation
  const { t } = useTranslation();

  // Hooks updated with the assos information when the page is mounted
  const [assosData, setAssosData] = useState<AssosData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assosData = await Api.assos.get();
        setAssosData(assosData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading appears while waiting for data
  if (loading) {
    return (
      <IonTabButton disabled>
        <IonSpinner name='circular' />
      </IonTabButton>
    );
  }

  // We check if we have the data we want
  if (!assosData) {
    return (
      <>
        <IonContent className="ion-padding">
          <div className="center-screen-text">
            <IonLabel style={{ "marginBottom": "25%" }}>Aucune information n'a été trouvé</IonLabel>
            <div>
              <IonIcon size="large" icon={searchOutline} /> <IonIcon size="large" icon={help} />
            </div>
          </div>
        </IonContent>
      </>
    );
  }

  const filteredData = filterData(assosData, segValue);

  return (
    <>
      {
        filteredData.length > 0 ?
          <div>
            {
              filteredData.map(asso =>
                <div key={asso.id} >
                  <IonCard className="asso-card" button={true} href={"/association/" + asso.id}>
                    <img alt="logo" className="asso-image-size" src={asso.logos[0]} style={{ width: '100%' }} />
                    <IonCardHeader>
                      <IonCardTitle style={{ color: asso.color }} className="card-asso-title">{asso.names[0]}</IonCardTitle>
                      <IonCardSubtitle style={{ color: asso.color }} className="card-assos-sub">{asso.theme}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </div>)
            }
          </div> :

          <div className="ion-padding all-screen-swipe" >
            <h1 className="title">{t('associations.filter.' + segValue + '.message.title')}</h1>
            <div className="justify-text"><IonLabel>{t('associations.filter.' + segValue + '.message.text')}</IonLabel></div>
          </div>
      }
    </>
  );
}

export default AssociationCards;