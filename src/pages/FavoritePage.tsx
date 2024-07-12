import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import AssociationCards from "./Association/AssociationCards";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import EventsComponent from "../components/EventComponent/EventsComponent";

const FavoritePage: React.FC = () => {
    // Used to translate the page
    const { t } = useTranslation();

    const [desiredSeg, setDesiredSeg] = useState("assos");
    const [activeIndex, setActiveIndex] = useState(0);

    // Used by the swiper to reference the segment value
    const swiperRef = useRef<any>(null);
    const segments = ['assos', 'events'];

    // Function to update the slider when we change the segment value
    const handleSegmentChange = (event: CustomEvent) => {
        // We get the segement value
        const newFilter = event.detail.value;

        // And update the value
        setDesiredSeg(newFilter);

        // With it we update the swiper index
        const newIndex = segments.findIndex(segment => segment === newFilter);
        swiperRef.current?.swiper.slideTo(newIndex);
        setActiveIndex(newIndex);
    };

    // Function to update the semgent when we change the slider value
    const handleSlideChange = (swiper: any) => {
        // We get the swiper index
        const newIndex = swiper.activeIndex;

        // And update the segment index
        setDesiredSeg(segments[newIndex]);
        setActiveIndex(newIndex);
    };

    return (
        <IonPage>
            <IonSegment value={desiredSeg} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="assos"><IonLabel>{t('associations.filter.sub.label')}</IonLabel></IonSegmentButton>
                <IonSegmentButton value="events"><IonLabel>{t('events.filter.favorite.label')}</IonLabel></IonSegmentButton>
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
                        {activeIndex === 0 && <AssociationCards segValue={"sub"} />}
                    </SwiperSlide>

                    <SwiperSlide key={1}>
                        {activeIndex === 1 && <EventsComponent filter='favorite' />}
                    </SwiperSlide>

                </Swiper>
            </IonContent>
        </IonPage>
    )
}

export default FavoritePage