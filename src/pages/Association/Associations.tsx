import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from "@ionic/react";
import { useRef, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import "../../theme/Association/Association.css";
import AssociationCards from "./AssociationCards";

import { useTranslation } from "react-i18next";

function filterData(filterChoice: string, data: any, callback: Function) {
  if (!data) {
    return;
  }

import { Swiper, SwiperClass, SwiperRef, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Associations: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('active');
  const categories = ["active", "over", "all"];
  const swiperRef = useRef<SwiperRef>(null);

  // Handle change in desired segment
  const handleSegmentChange = (event: CustomEvent) => {
    const newFilter = event.detail.value;
    setFilter(newFilter);
    const newIndex = categories.findIndex(segment => segment === newFilter);
    swiperRef.current?.swiper.slideTo(newIndex);

    };

  const handleSlideChange = (swiper: SwiperClass) => {
    setFilter(categories[swiper.activeIndex]);
  }


  return (
    <IonPage>
      <HeaderTitle>Liste des associations</HeaderTitle>
        <IonSegment value={filter} onIonChange={handleSegmentChange}>
          <IonSegmentButton value={'active'}>
            <IonLabel>{t('associations.tab-active')}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={'over'}>
            <IonLabel>{t('associations.tab-over')}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={'all'}>
            <IonLabel>{t('associations.tab-all')}</IonLabel>
          </IonSegmentButton>

      </IonSegment>

      <IonContent>
      <Swiper ref={swiperRef}
      onSlideChange={handleSlideChange}>
          {categories.map((val, index) => (
            <SwiperSlide key={index}>
              <AssociationCards segValue={val} />
            </SwiperSlide>
          ))}
        </Swiper>

      </IonContent>

    </IonPage>
  );
}

export default Associations;
