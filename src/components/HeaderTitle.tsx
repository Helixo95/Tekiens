import { ReactNode } from 'react';
import { IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

interface Props {
    children: ReactNode;
}

const HeaderTitle = ({ children }: Props) => {

    return (
        <IonHeader id="main-content">
            <IonToolbar color={'primary'}>
                <IonTitle slot='start'>{children}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default HeaderTitle