import { IonContent, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import '../../theme/Event/Events.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import FuturEventsComponent from '../../components/EventComponent/FuturEventsComponent';
import OngoingEventsComponent from '../../components/EventComponent/OngoingEventsComponent';
import PastEventsComponent from '../../components/EventComponent/PastEventsComponent';
import AllEventsComponent from '../../components/EventComponent/AllEventsComponent';


const EventsComponents: React.FC = () => {
    // Use to translate the page
    const { t } = useTranslation();

    const [filter, setFilter] = useState('futur');

    const swiperRef = useRef<any>(null);

    const segments = ['futur', 'ongoing', 'past', 'all'];

    const handleSegmentChange = (event: CustomEvent) => {
        const newFilter = event.detail.value;
        setFilter(newFilter);
        const newIndex = segments.findIndex(segment => segment === newFilter);
        swiperRef.current?.swiper.slideTo(newIndex);
    };

    const handleSlideChange = (swiper: any) => {
        const newIndex = swiper.activeIndex;
        setFilter(segments[newIndex]);
    };

    return (
        <IonContent>
            <IonSegment scrollable={true} value={filter} onIonChange={handleSegmentChange}>
                <IonSegmentButton value='futur'>
                    <IonLabel>{t('events.filter.futur.label')}</IonLabel>
                </IonSegmentButton>

                <IonSegmentButton value='ongoing'>
                    <IonLabel>{t('events.filter.ongoing.label')}</IonLabel>
                </IonSegmentButton>

                <IonSegmentButton value='past'>
                    <IonLabel>{t('events.filter.past.label')}</IonLabel>
                </IonSegmentButton>

                <IonSegmentButton value='all'>
                    <IonLabel>{t('events.filter.all.label')}</IonLabel>
                </IonSegmentButton>
            </IonSegment>

            <Swiper
                ref={swiperRef}
                onSlideChange={handleSlideChange}
                initialSlide={0}
                className="full-screen"
                loop={false}
            >
                <SwiperSlide key={0} className="full-screen">
                    <div className='ion-content-scroll'>
                        <FuturEventsComponent />
                    </div>
                </SwiperSlide>

                <SwiperSlide key={1} className="full-screen">
                    <div className='ion-content-scroll'>
                        <OngoingEventsComponent />
                    </div>
                </SwiperSlide>

                <SwiperSlide key={2} className="full-screen">
                    <div className='ion-content-scroll'>
                        <PastEventsComponent />
                    </div>
                </SwiperSlide>

                <SwiperSlide key={3} className="full-screen">
                    <div className='ion-content-scroll'>
                        <AllEventsComponent />
                    </div>
                </SwiperSlide>

            </Swiper>
        </IonContent>
    );
};

export default EventsComponents;
