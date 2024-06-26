import { ReactNode } from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { arrowBackOutline } from 'ionicons/icons';

interface Props {
    children: ReactNode;
    back: string;
}

const HeaderTitleBack = ({ children, back }: Props) => {
    const history = useHistory();

    const goToPreviousPage = () => {
        if (back) {
            history.push(back);
        } else {
            history.goBack();
        }
    };

    return (
        <IonHeader>
            <IonToolbar color={'primary'}>
                <IonButtons slot="start">
                    <IonButton onClick={goToPreviousPage}>
                        <IonIcon icon={arrowBackOutline} slot='start' />
                    </IonButton>
                </IonButtons>
                <IonTitle>{children}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}

export default HeaderTitleBack