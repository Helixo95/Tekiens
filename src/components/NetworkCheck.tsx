import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { Network } from '@capacitor/network';
import { ReactNode, useEffect, useState } from 'react';
import HeaderTitle from './HeaderTitle';
import { wifi } from 'ionicons/icons';
import '../theme/NetworkCheck.css'
import { useTranslation } from 'react-i18next';

const NetworkCheck: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Used to translate the page
    const { t } = useTranslation();

    const [status, setStatus] = useState<string>();

    // Function to check the network status and update the use state
    const logCurrentNetworkStatus = async () => {
        const status = await Network.getStatus();

        if (status.connected) {
            setStatus("true");
        }
        else {
            setStatus("false");
        }
    };

    // We get the netword status
    useEffect(() => {
        logCurrentNetworkStatus();
    }, []);

    // Listener when the network status change
    Network.addListener('networkStatusChange', async status => {
        console.log('Network status changed', status);

        if (status.connected) {
            setStatus("true");
        }
        else {
            setStatus("false");
        }

    });

    // Depending of the network status we're displaying or not the connection error page

    if (status == "false") {
        return (
            <IonPage>
                <HeaderTitle>{t('no-connection.header')}</HeaderTitle>
                <IonContent className='ion-padding'>
                    <div className="no-connection-content">
                        <h1>{t('no-connection.title')}</h1>
                        <h5>{t('no-connection.sub-title-1')}</h5>
                        <h5>{t('no-connection.sub-title-2')}</h5>
                        <IonIcon icon={wifi} className="no-connection-icon" />
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    return <>{children}</>;
};

export default NetworkCheck;
