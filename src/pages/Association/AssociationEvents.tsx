import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import Events from "../Event/Events";
import HeaderTitleBack from "../../components/HeaderTitleBack";



const AssociationEvents: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <IonPage>
            <IonContent>
                <HeaderTitleBack back={"/association/" + id}>Événement</HeaderTitleBack>
                <Events apiHref={"assos/" + id + "/events"} />
            </IonContent>
        </IonPage>);
}

export default AssociationEvents;