import { IonBadge, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router'
import { homeOutline, starOutline, calendarOutline, readerOutline, settingsOutline } from 'ionicons/icons';
import Home from "../pages/HomePage";
import Events from '../pages/Event/EventsPage';
import Favorite from '../pages/FavoritePage';
import Settings from '../pages/Settings/SettingsPage';
import Associations from '../pages/Association/Associations';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Api from '../Tools/Api';
import { EventData } from '../Tools/Interfaces/EventAndAssoInterface';

const Tabs: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    const [newEventCount, setNewEventCount] = useState<number | null>(null);

    const fetchNewEvents = async () => {
        const lastCheckedDate = localStorage.getItem('lastCheckedDate');
        const lastSavedDate = lastCheckedDate ? new Date(lastCheckedDate) : new Date();
        const events = await Api.event.get();
        let newEvents = 0;

        events.map((event: EventData) => {
            const eventCreationDate = new Date(event.createDate);

            eventCreationDate.setHours(eventCreationDate.getHours() + 2);

            if (eventCreationDate > lastSavedDate) {
                newEvents++;
            }
        })

        if (newEvents > 0) {
            setNewEventCount(newEvents);
        } else {
            setNewEventCount(null);
        }

        localStorage.setItem('lastCheckedDate', new Date().toISOString());
    };

    useEffect(() => {
        fetchNewEvents();
    }, []);

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/app/home" render={() => <Home />} exact={true} />
                <Route path="/app/associations" render={() => <Associations />} exact={true} />
                <Route path="/app/events" render={() => <Events />} exact={true} />
                <Route path="/app/favorite" render={() => <Favorite />} exact={true} />
                <Route path="/app/settings" render={() => <Settings />} exact={true} />

                <Route path="/app" exact={true} >
                    <Redirect to='/app/home' />
                </Route>
            </IonRouterOutlet>

            <IonTabBar slot='bottom'>
                <IonTabButton tab='home' onClick={() => fetchNewEvents()} href='/app/home'>
                    <IonIcon icon={homeOutline} />
                    <IonLabel>{t('home.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='associations' onClick={() => fetchNewEvents()} href='/app/associations'>
                    <IonIcon icon={readerOutline} />
                    <IonLabel>{t('associations.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='events' onClick={() => setNewEventCount(null)} href='/app/events'>
                    <IonIcon icon={calendarOutline} />
                    {newEventCount ? newEventCount > 0 && <IonBadge>{newEventCount}</IonBadge> : ''}
                    <IonLabel>{t('events.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='favorite' onClick={() => fetchNewEvents()} href='/app/favorite'>
                    <IonIcon icon={starOutline} />
                    <IonLabel>{t('favorite.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='settings' onClick={() => fetchNewEvents()} href='/app/settings'>
                    <IonIcon icon={settingsOutline} />
                    <IonLabel>{t('settings.title')}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs