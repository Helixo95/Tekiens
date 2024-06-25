import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router'
import { homeOutline, starOutline, calendarOutline, readerOutline, settingsOutline } from 'ionicons/icons';
import Accueil from "../pages/PageAccueil";
import Événements from '../pages/Event/PageÉvènements';
import Favoris from '../pages/PageFavoris';
import Paramètres from '../pages/Settings/PageParamètres';
import Associations from '../pages/Association/Associations';
import { useTranslation } from 'react-i18next';

const Tabs: React.FC = () => {
    // Use to translte the page
    const { t } = useTranslation();

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/app/accueil" render={() => <Accueil />} exact={true} />
                <Route path="/app/associations" render={() => <Associations />} exact={true} />
                <Route path="/app/événements" render={() => <Événements />} exact={true} />
                <Route path="/app/favoris" render={() => <Favoris />} exact={true} />
                <Route path="/app/settings" render={() => <Paramètres />} exact={true} />

                <Route path="/app" exact={true} >
                    <Redirect to='/app/accueil' />
                </Route>
            </IonRouterOutlet>

            <IonTabBar slot='bottom'>
                <IonTabButton tab='accueil' href='/app/accueil'>
                    <IonIcon icon={homeOutline} />
                    <IonLabel>{t('home.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='associations' href='/app/associations'>
                    <IonIcon icon={readerOutline} />
                    <IonLabel>{t('associations.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='événements' href='/app/événements'>
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>{t('events.tab-title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='favoris' href='/app/favoris'>
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