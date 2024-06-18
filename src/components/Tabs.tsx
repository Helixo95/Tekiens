import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { Redirect, Route } from 'react-router'
import { homeOutline, starOutline, calendarOutline, readerOutline, addOutline } from 'ionicons/icons';
import Accueil from "../pages/PageAccueil";
import Événements from '../pages/PageÉvénements';
import Favoris from '../pages/PageFavoris';
import Plus from '../pages/PagePlus';
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
                <Route path="/app/plus" render={() => <Plus />} exact={true} />

                <Route path="/app" exact={true} >
                    <Redirect to='/app/accueil' />
                </Route>
            </IonRouterOutlet>

            <IonTabBar slot='bottom'>
                <IonTabButton tab='accueil' href='/app/accueil'>
                    <IonIcon icon={homeOutline} />
                    <IonLabel>{t('accueil.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='associations' href='/app/associations'>
                    <IonIcon icon={readerOutline} />
                    <IonLabel>{t('associations.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='événements' href='/app/événements'>
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>{t('evenements.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='favoris' href='/app/favoris'>
                    <IonIcon icon={starOutline} />
                    <IonLabel>{t('favoris.title')}</IonLabel>
                </IonTabButton>

                <IonTabButton tab='plus' href='/app/plus'>
                    <IonIcon icon={addOutline} />
                    <IonLabel>{t('plus.title')}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs