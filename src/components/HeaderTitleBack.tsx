import { ReactNode } from 'react';
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

interface Props {
    children: ReactNode;
    back: string;
}

const HeaderTitleBack = ({ children, back }: Props) => {

    return (
        <IonHeader>
            <IonToolbar color={'primary'}>
                <IonButtons slot="start">
                    <IonBackButton defaultHref={back} />
                </IonButtons>
                <IonTitle>{children}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default HeaderTitleBack