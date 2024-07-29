import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css';
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Tabs from './components/Tabs';
import Preferences from './pages/Settings/PreferencesPage';
import Links from './pages/Settings/LinksPage';
import FAQ from './pages/Settings/FAQPage';
import Connexion from './pages/Settings/ConnexionPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import './MultiLang.js';
import React, { useEffect } from 'react';
import EventDetails from './pages/Event/EventDetails';
import AssociationDetails from './pages/Association/AssociationDetail';
import AssociationEvents from './pages/Association/AssociationEvents';
import CreateEvent from './pages/Event/CreateEvent';
import ModifyEvent from './pages/Event/ModifyEvent';
import ModifyAsso from './pages/Association/ModifyAsso';
import { EventDataProvider } from './contexts/EventDataContext';
import NetworkCheck from './components/NetworkCheck';
import { askUserForNotification, checkNotificationPermission } from './Tools/NotificationsHandler';

setupIonicReact();

const App: React.FC = () => {
  checkNotificationPermission();
  askUserForNotification();

  return (
    <React.StrictMode>
      <React.Suspense fallback={<div>Loading...</div>}>
        <IonApp>
          <ThemeProvider>
            <AuthProvider>
              <NetworkCheck>
                <IonReactRouter>
                  <IonRouterOutlet>
                    <Route path="/" exact>
                      <Redirect to='/app/home' />
                    </Route>
                    <Route path="/app" component={Tabs} />
                    <Route path="/association/:id" component={AssociationDetails} exact />
                    <Route path="/association/:id/events" component={AssociationEvents} exact />
                    <Route path="/association/modify/:id" component={ModifyAsso} exact />
                    <EventDataProvider>
                      <Route path="/event/:id" component={EventDetails} exact />
                      <Route path="/event/modify/:id" component={ModifyEvent} exact />
                    </EventDataProvider>
                    <Route path="/createEvent/" component={CreateEvent} exact />
                    <Route path="/preferences" component={Preferences} exact />
                    <Route path="/faq" component={FAQ} exact />
                    <Route path="/links" component={Links} exact />
                    <Route path="/login" component={Connexion} exact />
                  </IonRouterOutlet>
                </IonReactRouter>
              </NetworkCheck>
            </AuthProvider>
          </ThemeProvider>
        </IonApp>
      </React.Suspense>
    </React.StrictMode>
  );
};

export default App;
