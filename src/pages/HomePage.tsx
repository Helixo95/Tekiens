import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonPage, IonRow } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import AssociationCards from "./Association/AssociationCards";
import EventsComponent from "../components/EventComponent/EventsComponent";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const [bAssoReload, setAssoReaload] = useState(false);
  const updateRandomAsso = () => {
    setAssoReaload(!bAssoReload);
  }

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonContent className="ion-padding">


        <div>
          <h1 className="title center-screen-text">Découvrez une assos :</h1>
          <Swiper
            spaceBetween={20}
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
          </Swiper>
        </div>

        <div style={{ backgroundColor: 'var(--ion-color-primary)', width: '100%', height: '3px' }} />

        <div>
          <h1 className="title center-screen-text">Évènements à venir :</h1>
          <EventsComponent filter={"futur"} />
        </div>

      </IonContent>
    </IonPage>
  );
}

export default HomePage;