import { IonContent, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import '../../theme/Event/Events.css';
import EventsComponent from './EventsComponent';

const EventsList: React.FC<{ assoID?: string }> = ({ assoID = '' }) => {
    // Used to translate the page
    const { t } = useTranslation();

    const [filter, setFilter] = useState('futur');
    const [activeIndex, setActiveIndex] = useState(0);

    // Used by the swiper to reference the segment value
    const swiperRef = useRef<any>(null);
    const segments = ['futur', 'ongoing', 'past', 'all'];

    // Function to update the slider when we change the segment value
    const handleSegmentChange = (event: CustomEvent) => {
        // We get the segement value
        const newFilter = event.detail.value;

        // And update the value
        setFilter(newFilter);

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
                    slidesPerView={1}
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
