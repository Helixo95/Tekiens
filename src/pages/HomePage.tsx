import { IonButton, IonContent, IonPage, IonTitle } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import AssociationCards from "./Association/AssociationCards";
import { useState } from "react";
import { getUserToken } from "../Tools/Notifications/TopicSub";
import {FCM} from '@capacitor-community/fcm';

const HomePage: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();
  const emptyTitle = t('associations.message.title');
  const emptyMessage = t('associations.message.text');

  const [bAssoReload, setAssoReaload] = useState(false);
  const updateRandomAsso = () =>{
    setAssoReaload(!bAssoReload);
  }

  function handleClick(){
    FCM.getToken()
    .then(r => alert(`Token ${r.token}`))
    .catch(err => alert(err));  
  }

  function handleClick2(){
    FCM.subscribeTo({topic: "allUsers"})
    .then(r => {
        alert(`Successfully subscribed to allUsers`+r);
        alert('Subbed to topic');
    })
    .catch(error => alert(error));
  }

  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonTitle>Newest 999999 !!!!</IonTitle>
      <IonContent>
        <Swiper          
            spaceBetween={2000}
            slidesPerView={1}
            loop={true}
            onSlideChangeTransitionStart={updateRandomAsso}
            >
              <IonButton onClick={handleClick}>Press to get user token</IonButton>
              <IonButton onClick={handleClick2}>Press to get force sub token</IonButton>
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