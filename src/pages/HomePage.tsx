import { IonContent, IonLabel, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import AssociationCards from "./Association/AssociationCards";
import EventCarousel from "../components/EventComponent/EventCarousel";

const HomePage: React.FC = () => {
  // Used to translate the page
  const { t } = useTranslation();

  const [bAssoReload, setAssoReaload] = useState(false);

  // At each change we get another random association
  const updateRandomAsso = () => {
    setAssoReaload(!bAssoReload);
  }

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonContent class="ion-padding">
        
        <div style={{ marginBottom: '20px' }} className="center-screen-text justify-text">
          <h1 className="title ">{t('home.app-title')}</h1>
          <IonLabel>{t('home.app-description')}</IonLabel>
        </div>

        <div style={{ backgroundColor: 'var(--ion-color-primary)', width: '100%', height: '3px' }} />

        <div style={{ height: '300px' }}>
          <h1 className="title center-screen-text">{t('home.discover')}</h1>
          <Swiper
            spaceBetween={20000}
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

        <div className="center-screen-text">
          <h1 className="title">{t('home.upcoming')}</h1>
          <EventCarousel filter={"futur"} />
        </div>

        <div style={{ backgroundColor: 'var(--ion-color-primary)', width: '100%', height: '3px' }} />

        <div className="center-screen-text">
          <h1 className="title">{t('home.ongoing')}</h1>
          <EventCarousel filter={"ongoing"} />
        </div>

      </IonContent >
    </IonPage >
  );
}

export default HomePage;