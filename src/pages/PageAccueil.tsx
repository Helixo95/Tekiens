import { useState } from "react";
import { IonAlert, IonButton, IonContent, IonPage } from "@ionic/react";
import ListGroup from "../components/ListGroup";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";

const Accueil: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();

  let items = ['New York', 'London', 'Sidney', 'Paris'];

  const [selectedAsso, setSelectedAsso] = useState("");

  const handleSelectItem = (item: string) => {
    console.log(item);
    setSelectedAsso(item);
  }

  return (
    <IonPage>
      <HeaderTitle>{t('accueil.title')}</HeaderTitle>
      <IonContent>
        <ListGroup items={items} heading={"Cities"} onSelectecItem={handleSelectItem} />
        <IonButton id="asso-alert" color={'primary'} disabled={selectedAsso === ""}>Choisir</IonButton>
        <IonAlert
          trigger="asso-alert"
          header="Nom association"
          message={selectedAsso === "" ? "Vous n'avez chosisi aucune association" : "Vous avez choisi l'association " + selectedAsso}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );

}

export default Accueil;