import { IonButton, IonContent, IonItem, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";

import { useAuth } from "../contexts/AuthContext";

const HomePage: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();

  const { assos, isAuthenticated } = useAuth();

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonContent className="ion-padding">
        <IonItem>{isAuthenticated ? "Logged In" : "Logged Out"}</IonItem>
        <IonItem>{assos ? "Assos id :" + assos.id : ""}</IonItem>
      </IonContent>
    </IonPage>
  );

}

export default HomePage;