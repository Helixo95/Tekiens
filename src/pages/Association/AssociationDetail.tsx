import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonSpinner, IonTabButton, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { getAssoInformationByID } from "../../Tools/APIFetch";
import { useParams } from "react-router";
import { logoDiscord, logoInstagram, paperPlane, logoLinkedin, globeOutline, leafOutline, atOutline, logoFacebook, locationOutline, extensionPuzzleOutline } from 'ionicons/icons';
import { GlobalAssociationData, SocialsData } from '../../Tools/Interfaces/AssosInterface';
import { parseText } from "../../Tools/DOMParser";

import "../../theme/Association/AssociationDetail.css";


const AssociationDetails: React.FC = () => {
    const [data, setData] = useState<GlobalAssociationData | null>(null);
    const [description, setDescription] = useState<string>("");
    const { id } = useParams<{ id: string }>(); // Retrieve the asso id from the URL

    // List all the used logos in an associative array
    interface Logos { [key: string]: string; }
    const logos: Logos = {
        discord: logoDiscord, instagram: logoInstagram,
        linkedin: logoLinkedin, telegram: paperPlane, web: globeOutline, links: leafOutline, email: atOutline, facebook: logoFacebook
    }

    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
            const result = await getAssoInformationByID(id);
            if (result) {
                setData(result);
                await parseText(result.description, setDescription);
            }
        }

        fetchData();
    }, []);


    return (
        <IonPage>
            <IonToolbar>
                <IonHeader>
                    <IonButtons>
                        <IonBackButton defaultHref='/app/associations' style={{ color: data?.color }} />
                    </IonButtons>
                </IonHeader>

                {data ? <IonTitle style={{ color: data?.color }} className="assos-title">{Array.isArray(data.names) ? data.names[0] : data.names}</IonTitle> : ""}
            </IonToolbar>

            {data ?
                <>
                    <IonContent>
                        <IonCard className="assos-description">
                            <IonCardContent>
                                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                            </IonCardContent>
                        </IonCard>
                    </IonContent>

                    <IonFooter translucent={true}>
                        <IonToolbar slot="bottom">
                            {data.socials.map((val: SocialsData) =>
                                <IonButton fill="clear" key={val.id} onClick={() => window.open(val.link, '_system', 'location=yes')} className="socials-button" style={{ '--border-color': data.color }}>
                                    <IonIcon icon={logos[val.id]} style={{ color: data.color }} />
                                </IonButton>
                            )}

                            <IonButton fill="clear" shape="round" className="socials-button" style={{ '--border-color': data.color }} disabled={true}>
                                <IonIcon icon={locationOutline} style={{ color: data.color }} />
                                <IonText style={{ color: data.color }}>{data.campus}</IonText>
                            </IonButton>

                            <IonButton fill="clear" shape="round" className="socials-button" style={{ '--border-color': data.color }} disabled={true}>
                                <IonIcon icon={extensionPuzzleOutline} style={{ color: data.color }} />
                                <IonText style={{ color: data.color }}>{data.theme}</IonText>
                            </IonButton>

                        </IonToolbar>
                        <IonGrid>

                        </IonGrid>
                    </IonFooter>
                </>
                : ""
            }


        </IonPage>)
}

export default AssociationDetails;