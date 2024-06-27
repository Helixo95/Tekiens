import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router'
import { homeOutline, starOutline, calendarOutline, readerOutline, settingsOutline } from 'ionicons/icons';
import Home from "../pages/HomePage";
import Events from '../pages/Event/EventsPage';
import Favorite from '../pages/FavoritePage';
import Settings from '../pages/Settings/SettingsPage';
import Associations from '../pages/Association/Associations';
import { useTranslation } from 'react-i18next';

const Tabs: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

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
                <IonTabButton tab='home' href='/app/home'>
                    <IonIcon icon={homeOutline} />
                    <IonLabel>{t('home.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='associations' href='/app/associations'>
                    <IonIcon icon={readerOutline} />
                    <IonLabel>{t('associations.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='events' href='/app/events'>
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>{t('events.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='favorite' href='/app/favorite'>
                    <IonIcon icon={starOutline} />
                    <IonLabel>{t('favorite.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='settings' href='/app/settings'>
                    <IonIcon icon={settingsOutline} />
                    <IonLabel>{t('settings.title')}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs