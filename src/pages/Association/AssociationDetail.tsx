import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonSpinner, IonTabButton, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { getAssoInformationByID } from "../../Tools/APIFetch";
import { useParams } from "react-router";
import { logoDiscord, logoInstagram, paperPlane, logoLinkedin, globeOutline, leafOutline, atOutline, logoFacebook, locationOutline, extensionPuzzleOutline, calendarOutline } from 'ionicons/icons';
import { GlobalAssociationData, SocialsData } from '../../Tools/Interfaces/AssosInterface';
import { parseText } from "../../Tools/DOMParser";

import "../../theme/Association/AssociationDetail.css";
import HeaderTitleBack from "../../components/HeaderTitleBack";


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
                parseText(result.description, setDescription);
            }
        }

        fetchData();
    }, []);


    return (
        <IonPage>
            <HeaderTitleBack back="/app/associations" children={undefined} />
            {data ?
                <>
                    <IonContent>
                        <IonCard className="detail-asso-description">
                            <IonCardContent>
                                <IonCardTitle style={{color: data.color}}>{data.names[0]}</IonCardTitle>
                                <img className="detail-asso-image"  width="40%" src={"https://tekiens.net/data/"+data.id+"/logo-0.webp"}/>
                                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                            </IonCardContent>
                        </IonCard>
                    </IonContent>

                    <IonFooter translucent={true}>
                        <IonToolbar slot="bottom">
                            {data.socials.map((val: SocialsData) =>
                                <IonButton fill="clear" key={val.id} onClick={() => window.open(val.link, '_system', 'location=yes')} className="detail-socials-button" style={{ '--border-color': data.color }}>
                                    <IonIcon icon={logos[val.id]} style={{ color: data.color }} />
                                </IonButton>
                            )}


                            <IonButton fill="clear" className="detail-socials-button" style={{'--border-color': data.color}} 
                            href={"/association/"+data.id+"/events"}>
                                    <IonIcon icon={calendarOutline} style={{color: data.color}}/>
                                </IonButton>
                            <IonItem>
                                <IonIcon icon={locationOutline} style={{ color: data.color }} />
                                <IonText style={{ color: data.color }}>{data.campus}</IonText>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={extensionPuzzleOutline} style={{ color: data.color }} />
                                <IonText style={{ color: data.color }}>{data.theme}</IonText>
                            </IonItem>

                        </IonToolbar>
                    </IonFooter>
                </>
                : 
                <IonContent>
                    <IonSpinner name="circular" />
                </IonContent>
            }


        </IonPage>)
}

export default AssociationDetails;