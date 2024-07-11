import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { Network } from '@capacitor/network';
import { ReactNode, useEffect, useState } from 'react';
import HeaderTitle from './HeaderTitle';
import { wifi } from 'ionicons/icons';
import '../theme/NetworkCheck.css'
import { useTranslation } from 'react-i18next';

const NetworkCheck: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Use for the translation
    const { t } = useTranslation();

    const [status, setStatus] = useState<string>();

    const logCurrentNetworkStatus = async () => {
        const status = await Network.getStatus();

        if (status.connected) {
            setStatus("true");
        }
        else {
            setStatus("false");
        }
    };

    useEffect(() => {
        logCurrentNetworkStatus();
    }, []);

    console.log(status);

    Network.addListener('networkStatusChange', async status => {
        console.log('Network status changed', status);

        if (status.connected) {
            setStatus("true");
        }
        else {
            setStatus("false");
        }

    });

    if (status == "true") {
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
