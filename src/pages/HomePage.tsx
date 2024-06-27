import { IonButton, IonContent, IonPage, IonTitle } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import AssociationCards from "./Association/AssociationCards";
import { useState } from "react";

const HomePage: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();
  const emptyTitle = t('associations.message.title');
  const emptyMessage = t('associations.message.text');

  const [bAssoReload, setAssoReaload] = useState(false);
  const updateRandomAsso = () =>{
    setAssoReaload(!bAssoReload);
  }

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonTitle>Newest Test !!!!</IonTitle>
      <IonContent>
        <Swiper          
            spaceBetween={2000}
            slidesPerView={1}
            loop={true}
            onSlideChangeTransitionStart={updateRandomAsso}
            >
              <SwiperSlide>
              <AssociationCards key={String(bAssoReload)} segValue={"rnd"} emptyTitle={emptyTitle} emptyMessage={emptyMessage} />  
              </SwiperSlide>
              <SwiperSlide>
              <AssociationCards key={String(bAssoReload)} segValue={"rnd"} emptyTitle={emptyTitle} emptyMessage={emptyMessage} />  
              </SwiperSlide>
          </Swiper>
      </IonContent>
    </IonPage>
  );

}

export default HomePage;