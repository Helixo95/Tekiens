import { IonContent, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import '../../theme/Event/Events.css';
import EventsComponent from '../../components/EventComponent/EventsComponent';

const EventsList: React.FC<{ assoID?: string }> = ({ assoID = '' }) => {
    // Use for the translation
    const { t } = useTranslation();

    const [filter, setFilter] = useState('futur');
    const [activeIndex, setActiveIndex] = useState(0);

    // Used by the swiper to reference the segment value
    const swiperRef = useRef<any>(null);
    const segments = ['futur', 'ongoing', 'past', 'all'];

    const handleSegmentChange = (event: CustomEvent) => {
        const newFilter = event.detail.value;
        setFilter(newFilter);
        const newIndex = segments.findIndex(segment => segment === newFilter);
        swiperRef.current?.swiper.slideTo(newIndex);
        setActiveIndex(newIndex);
    };

    const handleSlideChange = (swiper: any) => {
        const newIndex = swiper.activeIndex;
        setFilter(segments[newIndex]);
        setActiveIndex(newIndex);
    };

    return (
        <>
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
            <IonContent>

                <Swiper
                    ref={swiperRef}
                    onSlideChange={handleSlideChange}
                    initialSlide={0}
                    loop={false}
                    freeMode={true}
                >

                    {segments.map((segment, index) => (
                        <SwiperSlide key={index}>
                            {activeIndex === index && <EventsComponent filter={segment} assoID={assoID} />}
                        </SwiperSlide>
                    ))}

                </Swiper>
            </IonContent>
        </>
    );
};

export default EventsList;