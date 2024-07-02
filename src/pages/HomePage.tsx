import { IonButton, IonContent, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import AssociationCards from "./Association/AssociationCards";
import Api from "../Tools/Api";

const HomePage: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();

  const [bAssoReload, setAssoReaload] = useState(false);
  const updateRandomAsso = () => {
    setAssoReaload(!bAssoReload);
  }

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonContent className="ion-padding">
        <Swiper
          spaceBetween={2000}
          slidesPerView={1}
          loop={true}
          onSlideChangeTransitionStart={updateRandomAsso}
        >
          <SwiperSlide>
            <AssociationCards key={String(bAssoReload)} segValue={"rnd"} />
          </SwiperSlide>

          <SwiperSlide>
            <AssociationCards key={String(bAssoReload)} segValue={"rnd"} />
          </SwiperSlide>
          <IonButton onClick={() => Api.sessions.delete('')}>Supp</IonButton>
        </Swiper>
      </IonContent>
    </IonPage>
  );

}

export default HomePage;