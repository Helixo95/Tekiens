import { IonContent, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonContent className="ion-padding">

      </IonContent>
    </IonPage>
  );

}

export default HomePage;