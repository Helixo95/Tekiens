import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSpinner, IonTabButton, IonText, IonToast, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { logoDiscord, logoInstagram, paperPlane, logoLinkedin, globeOutline, leafOutline, atOutline, logoFacebook, locationOutline, extensionPuzzleOutline, calendarOutline, addOutline, addCircle, removeCircleOutline, call, pulseOutline, colorFill, add, starSharp, starOutline, pencilOutline, addCircleOutline } from 'ionicons/icons';
import { SocialsData } from '../../Tools/Interfaces/EventAndAssoInterface';
import { parseText } from "../../Tools/DOMParser";
import { isAssoFollowed, followAssociation } from "../../Tools/LocalStorage/LocalStorageAssos";

import "../../theme/Association/AssociationDetail.css";
import HeaderTitleBack from "../../components/HeaderTitleBack";
import { useTranslation } from "react-i18next";
import { darkenColor } from "../../Tools/EventsTools";
import { AssosData } from "../../Tools/Interfaces/EventAndAssoInterface";
import Api from "../../Tools/Api";
import { useAuth } from "../../contexts/AuthContext";

const AssociationDetails: React.FC = () => {
    // Use for the translation
    const { t } = useTranslation();

    const history = useHistory();

    const { session } = useAuth();

    const [description, setDescription] = useState<string>("");
    const [isFollowed, setIsFollowed] = useState(false);
    const { id } = useParams<{ id: string }>(); // Retrieve the asso id from the URL

    const [assoData, setAssoData] = useState<AssosData>();
    const [loading, setLoading] = useState(true);

    // List all the used logos in an associative array
    interface Logos { [key: string]: string; }
    const logos: Logos = {
        discord: logoDiscord, instagram: logoInstagram,
        linkedin: logoLinkedin, telegram: paperPlane, web: globeOutline, links: leafOutline, email: atOutline, facebook: logoFacebook
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assoData = await Api.assos.getOne(id);
                setAssoData(assoData)

                await parseText(assoData.description, setDescription);
                setIsFollowed(isAssoFollowed(assoData.id));

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Loading appears while waiting for data
    if (loading) {
        return (
            <IonTabButton disabled>
                <IonSpinner name='circular' />
            </IonTabButton>
        );
    }

    // We check if we have the data we want
    if (!assoData) {
        return (
            <IonContent>
                <IonLabel>No asso was data found</IonLabel>
            </IonContent>
        );
    }

    const navigateToModifyAsso = () => {
        history.push(`/association/modify/${assoData.id}`, { asso: assoData });
    };

    const editable = () => {
        if (!session) {
            return false;
        }

        return assoData.id === session.asso_id;
    };

    return (
        <IonPage>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton className="detail-socials-button" style={{ '--border-color': assoData.color, '--background': assoData.color, '--background-activated': darkenColor(assoData.color) }}>
                    <IonIcon icon={add} />
                </IonFabButton>
                <IonFabList side="top">

                    {assoData.socials.map((social: SocialsData, index) =>
                        <IonFabButton key={index} onClick={() => window.open(social.link, '_system', 'location=yes')} className="detail-socials-button" style={{ '--border-color': assoData.color }}>
                            <IonIcon icon={logos[social.id]} style={{ color: assoData.color }} />
                        </IonFabButton>
                    )}

                    <IonFabButton className="detail-socials-button" onClick={() => followAssociation(assoData.id, setIsFollowed)} id="followAsso" style={{ '--border-color': assoData.color }}>
                        <IonIcon icon={isFollowed ? starSharp : starOutline} style={{ color: assoData.color }} />
                    </IonFabButton>

                    {editable() &&
                        <>
                            <IonFabButton className='fab-button' style={{ '--border-color': assoData?.color }} onClick={navigateToModifyAsso}>
                                <IonIcon icon={pencilOutline} style={{ color: assoData?.color }} />
                            </IonFabButton>

                            <IonFabButton className='fab-button' style={{ '--border-color': assoData?.color }} onClick={() => history.push("/createEvent")}>
                                <IonIcon icon={addCircleOutline} style={{ color: assoData?.color }} />
                            </IonFabButton>
                        </>
                    }

                </IonFabList>
            </IonFab>

            <HeaderTitleBack back={''}>{t('association.title')}</HeaderTitleBack>
            <IonContent>
                <IonToast
                    trigger="followAsso"
                    position="bottom"
                    swipeGesture="vertical"
                    message={isFollowed ? t('association.favorite.add') : t('association.favorite.remove')}
                    duration={1000}
                />
                <IonGrid className="ion-padding">

                    <IonRow class="title-image">
                        <img className="detail-asso-image" width="40%" src={"https://tekiens.net/data/" + assoData.id + "/logo-0.webp"} />
                        <div className="name-theme">
                            <h1 className='title' style={{ color: assoData.color }}>{assoData.names[0]}</h1>
                            <h4 style={{ color: assoData.color }}>{assoData.theme}</h4>
                        </div>
                    </IonRow>

                    <IonCol />
                    <IonRow>
                        <div style={{ backgroundColor: assoData?.color, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonCol>
                            <IonLabel className='about-asso-title'>{t('association.about')}</IonLabel>
                        </IonCol>
                    </IonRow>

                    <IonRow className='justify-text'>
                        <IonCol>
                            <IonText>{description ?
                                <div dangerouslySetInnerHTML={{
                                    __html:
                                        `<style>
                                        div a {
                                            color: ${assoData?.color}
                                        }
                                    </style> ${description}`
                                }} />
                                :
                                t('association.no-description')}
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton className="center-screen-text" style={{ '--background': assoData.color, '--background-activated': darkenColor(assoData.color) }} onClick={() => history.push("/association/" + assoData.id + "/events")} >
                                Voir tous les évènements de l'association
                            </IonButton>
                        </IonCol>
                    </IonRow>

                    <IonCol />
                    <IonRow>
                        <div style={{ backgroundColor: assoData?.color, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonCol>
                            <IonLabel className='about-event-title'>{t('association.more-info')}</IonLabel>
                        </IonCol>
                    </IonRow>

                    {assoData.start &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    {t('association.start')}
                                    {assoData.start}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {assoData.end &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    {t('association.end')}
                                    {assoData.end}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {assoData.campus &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    {t('association.campus')}
                                    {assoData.campus}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                    {assoData.room &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonLabel>
                                    {t('association.room')}
                                    {assoData.room}
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                    }

                </IonGrid>
            </IonContent>

        </IonPage >)
}

export default AssociationDetails;
