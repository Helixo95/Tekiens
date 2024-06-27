import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import FavoriteEventsComponent from '../components/EventComponent/FavoriteEventsComponent';
import AssociationCards from "./Association/AssociationCards";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

const FavoritePage: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    const [desiredSeg, setDesiredSeg] = useState("assos");
    const emptyTitle = t('favorite.filter.assos.message.title');
    const emptyMessage = t('favorite.filter.assos.message.text');
    const [activeIndex, setActiveIndex] = useState(0);

    // Used by the swiper to reference the segment value
    const swiperRef = useRef<any>(null);
    const segments = ['assos', 'events'];

    const handleSegmentChange = (event: CustomEvent) => {
        const newFilter = event.detail.value;
        setDesiredSeg(newFilter);
        const newIndex = segments.findIndex(segment => segment === newFilter);
        swiperRef.current?.swiper.slideTo(newIndex);
        setActiveIndex(newIndex);
    };

    const handleSlideChange = (swiper: any) => {
        const newIndex = swiper.activeIndex;
        setDesiredSeg(segments[newIndex]);
        setActiveIndex(newIndex);
    };

    return (
        <IonPage>
            <IonSegment value={desiredSeg} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="assos"><IonLabel>{t('favorite.filter.assos.label')}</IonLabel></IonSegmentButton>
                <IonSegmentButton value="events"><IonLabel>{t('favorite.filter.events.label')}</IonLabel></IonSegmentButton>
            </IonSegment>
            <HeaderTitle>{t('favorite.title')}</HeaderTitle>
            <IonContent>
                <Swiper
                    ref={swiperRef}
                    onSlideChange={handleSlideChange}
                    initialSlide={0}
                    loop={false}
                    freeMode={true}
                >

                    <SwiperSlide key={0}>
                        {activeIndex === 0 && <AssociationCards segValue={"sub"} emptyTitle={emptyTitle} emptyMessage={emptyMessage} />}
                    </SwiperSlide>

                    <SwiperSlide key={1}>
                        {activeIndex === 1 && <FavoriteEventsComponent />}
                    </SwiperSlide>

                </Swiper>
            </IonContent>
        </IonPage>
    )
}

export default FavoritePage