import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from "@ionic/react";
import { useRef, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import "../../theme/Association/Association.css";
import AssociationCards from "./AssociationCards";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useTranslation } from "react-i18next";

const Associations: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('active');
  const categories = ["active", "former", "all"];
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const emptyTitle = t('associations.message.title');
  const emptyMessage = t('associations.message.text');

  // Handle change in desired segment
  const handleSegmentChange = (event: CustomEvent) => {
    const newFilter = event.detail.value;
    setFilter(newFilter);
    const newIndex = categories.findIndex(categories => categories === newFilter);
    swiperRef.current?.swiper.slideTo(newIndex);
    setActiveIndex(newIndex);
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    const newIndex = swiper.activeIndex;
    setFilter(categories[newIndex]);
    setActiveIndex(newIndex);
  }

  return (
    <IonPage>
      <HeaderTitle>{t('associations.title')}</HeaderTitle>
      <IonSegment value={filter} onIonChange={handleSegmentChange}>
        <IonSegmentButton value={'active'}>
          <IonLabel>{t('associations.filter.active.label')}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={'former'}>
          <IonLabel>{t('associations.filter.former.label')}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={'all'}>
          <IonLabel>{t('associations.filter.all.label')}</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <IonContent>
        <Swiper
          onSlideChange={handleSlideChange}
          ref={swiperRef}
          initialSlide={0}
          loop={false}
          freeMode={true}
        >
          {categories.map((val, index) => (
            <SwiperSlide key={index}>
              {index === activeIndex && <AssociationCards segValue={val} />}
            </SwiperSlide>
          ))}

        </Swiper>
      </IonContent>
    </IonPage>
  );
}

export default Associations;
