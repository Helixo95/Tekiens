import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Assosbutton from './APIFetch';


const APICalls: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonTitle>APICall</IonTitle>
          <IonButtons>
            <IonBackButton defaultHref='/home'/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Assosbutton />
      </IonContent>
    </IonPage>
  );
};

export default APICalls;
