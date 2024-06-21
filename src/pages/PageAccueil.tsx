import { IonButton, IonContent, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";

const Accueil: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonContent>
      </IonContent>
    </IonPage>
  );

}

export default Accueil;