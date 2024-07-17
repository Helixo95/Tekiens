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
    // Used to translate the page
    const { t } = useTranslation();

    const [newEventCount, setNewEventCount] = useState<number | null>(null);

    // We get the new events
    const fetchNewEvents = async () => {
        // We get the last checked date from the local storage
        const lastCheckedDate = localStorage.getItem('lastCheckedDate');
        const lastSavedDate = lastCheckedDate ? new Date(lastCheckedDate) : new Date();

        // We get the events and initialize the counter to 0
        const events = await Api.event.get();
        let newEvents = 0;

        if (events) {
            // For each event we check their date and compare it to the last checked date
            // If the date is more recent from the last checked date we increment the count
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

            // We update the last checked date
            localStorage.setItem('lastCheckedDate', new Date().toISOString());
        }
    };

    // We get the new events
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
                <IonTabButton className='tabs-button' tab='home' onClick={() => fetchNewEvents()} href='/app/home'>
                    <IonIcon icon={homeOutline} />
                    <IonLabel className='tabs-label'>{t('home.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton className='tabs-button' tab='associations' onClick={() => fetchNewEvents()} href='/app/associations'>
                    <IonIcon icon={readerOutline} />
                    <IonLabel className='tabs-label'>{t('associations.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton className='tabs-button' tab='events' onClick={() => setNewEventCount(null)} href='/app/events'>
                    <IonIcon icon={calendarOutline} />
                    {newEventCount ? newEventCount > 0 && <IonBadge>{newEventCount}</IonBadge> : ''}
                    <IonLabel className='tabs-label'>{t('events.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton className='tabs-button' tab='favorite' onClick={() => fetchNewEvents()} href='/app/favorite'>
                    <IonIcon icon={starOutline} />
                    <IonLabel className='tabs-label'>{t('favorite.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton className='tabs-button' tab='settings' onClick={() => fetchNewEvents()} href='/app/settings'>
                    <IonIcon icon={settingsOutline} />
                    <IonLabel className='tabs-label'>{t('settings.title')}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs