import { IonButton, IonContent, IonItem, IonPage } from "@ionic/react";
import HeaderTitle from "../components/HeaderTitle";
import { useTranslation } from "react-i18next";
import Api from '../Tools/Api';
import { useEffect, useState } from "react";
import { AssosData, EventData } from "../Tools/Interfaces/EventInterface";

const HomePage: React.FC = () => {
  // Use to translte the page
  const { t } = useTranslation();

  const [events, setEvents] = useState<EventData[]>([]);
  const [event, setEvent] = useState<EventData>();

  const [assos, setAssos] = useState<AssosData[]>([]);
  const [asso, setAsso] = useState<AssosData>();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await Api.event.get();
        const eventData = await Api.event.getOne('66');

        const assosData = await Api.assos.get();
        const assoData = await Api.assos.getOne('animatsuri');

        setEvents(eventsData);
        setEvent(eventData);

        setAssos(assosData);
        setAsso(assoData)

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }
  else {
    console.log(events);
    console.log(event);

    console.log(assos);
    console.log(asso);
  }


  return (
    <IonPage>
      <HeaderTitle>{t('home.title')}</HeaderTitle>
      <IonContent className="ion-padding">

      </IonContent>
    </IonPage>
  );

}

export default HomePage;