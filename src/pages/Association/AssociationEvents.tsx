import { IonPage } from "@ionic/react";
import { useParams } from "react-router";
import EventsList from "../Event/EventsList";
import HeaderTitleBack from "../../components/HeaderTitleBack";

const AssociationEvents: React.FC = () => {
    // Use to get the association id from the href
    const { id } = useParams<{ id: string }>();

    return (
        <IonPage>
            <HeaderTitleBack back="">Événement</HeaderTitleBack>
            <EventsList assoID={id} />
        </IonPage>);
}

export default AssociationEvents;