import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonRefresher, IonRefresherContent, IonRow, IonSpinner, IonTabButton, IonTitle, RefresherEventDetail } from "@ionic/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../theme/Association/AssociationCards.css";
import { AssosData } from "../../Tools/Interfaces/EventAndAssoInterface";
import Api from "../../Tools/Api";
import { filterData } from "../../Tools/AssosTools";
import { help, searchOutline } from "ionicons/icons";
import { isColorDark } from "../../Tools/GeneralTools";

const AssociationCards: React.FC<{ segValue: string }> = ({ segValue }) => {
  // Used to translate the page
  const { t } = useTranslation();

  // Hooks updated with the assos information when the page is mounted
  const [assosData, setAssosData] = useState<AssosData[]>([]);
  const [loading, setLoading] = useState(true);

  // We get the associations data
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

  useEffect(() => {
    fetchData();
  }, [segValue]);

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

  // We get the filtered data
  const filteredData = filterData(assosData, segValue);

  // Function if the user want to reload the page
  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    fetchData().then(() => event.detail.complete());
  }

  return (
    <>
      <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      {
        filteredData.length > 0 ?
          <div className="assos">
            {
              filteredData.map(asso =>
                <div key={asso.id}>
                  <IonCard className="asso-card" button={true} href={"/association/" + asso.id} >
                    <img alt={'Logo ' + asso.names[0]} className="asso-image-size" src={asso.logos[0]} style={{ width: '100%' }} />
                    <IonCardHeader style={{ padding: '0px', 'paddingTop': '5%', 'paddingBottom': '5%' }}>
                      <IonCardTitle style={{ color: asso.color, fontSize: '1em' }} className={isColorDark(asso.color) ? "border-text" : ""}>{asso.names[0]}</IonCardTitle>
                      <IonCardSubtitle style={{ color: asso.color, fontSize: '0.8em' }} className={isColorDark(asso.color) ? "border-text" : ""}>{asso.theme}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </div>)
            }
          </div > :

          <div className="ion-padding all-screen-swipe" >
            <h1 className="title">{t('associations.filter.' + segValue + '.message.title')}</h1>
            <div className="justify-text"><IonLabel>{t('associations.filter.' + segValue + '.message.text')}</IonLabel></div>
          </div>
      }
    </>
  );
}

export default AssociationCards;