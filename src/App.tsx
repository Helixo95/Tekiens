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
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import Tabs from './pages/Tabs';
import Paramètres from './pages/PageParamètres';
import Liens from './pages/PageLiens';
import FAQ from './pages/PageFAQ';
import { ThemeProvider } from './contexts/ThemeContext';
import './MultiLang.js'
import React from 'react';
import EventDetails from './pages/EventDetails';

setupIonicReact();

const App: React.FC = () => {

  return (
    <React.StrictMode>
      <React.Suspense>
        <IonApp>
          <ThemeProvider>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route path="/" exact={true} >
                  <Redirect to='/app/accueil' />
                </Route>

                <Route path="/app" render={() => <Tabs />} />

                <Route path="/event/:id" render={() => <EventDetails />} />

                <Route path="/paramètres" render={() => <Paramètres />} exact={true} />
                <Route path="/faq" render={() => <FAQ />} exact={true} />
                <Route path="/liens" render={() => <Liens />} exact={true} />
              </IonRouterOutlet>
            </IonReactRouter>
          </ThemeProvider>
        </IonApp>
      </React.Suspense>
    </React.StrictMode>
  );
}

export default App;