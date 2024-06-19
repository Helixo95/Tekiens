import { IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";

const Accueil: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
    </IonPage>
  );

}

export default Accueil;