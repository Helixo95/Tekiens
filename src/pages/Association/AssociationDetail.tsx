import { IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSpinner, IonTabButton, IonText, IonTitle, IonToast, IonToolbar, RefresherEventDetail } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { logoDiscord, logoInstagram, paperPlane, logoLinkedin, globeOutline, leafOutline, atOutline, logoFacebook, locationOutline, extensionPuzzleOutline, calendarOutline, addOutline, addCircle, removeCircleOutline, call, pulseOutline, colorFill, add, starSharp, starOutline, pencilOutline, addCircleOutline, arrowBackOutline, searchOutline, help, logoTwitter } from 'ionicons/icons';
import { SocialsData } from '../../Tools/Interfaces/EventAndAssoInterface';
import { parseText } from "../../Tools/DOMParser";
import { isAssoFollowed, followAssociation } from "../../Tools/LocalStorage/LocalStorageAssos";

import "../../theme/Association/AssociationDetail.css";
import HeaderTitleBack from "../../components/HeaderTitleBack";
import { useTranslation } from "react-i18next";
import { AssosData } from "../../Tools/Interfaces/EventAndAssoInterface";
import Api from "../../Tools/Api";
import { useAuth } from "../../contexts/AuthContext";
import { brightenColor, darkenColor, isColorDark } from "../../Tools/GeneralTools";

const AssociationDetails: React.FC = () => {
    // Used to translate the page
    const { t } = useTranslation();

    const modalNames = useRef<HTMLIonModalElement>(null);
    const modalLogos = useRef<HTMLIonModalElement>(null);

    // Retrieve the asso id from the URL
    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    // Get the desire value from the context
    const { session } = useAuth();

    const [description, setDescription] = useState<string>("");
    const [isFollowed, setIsFollowed] = useState(false);

    const [assoData, setAssoData] = useState<AssosData>();
    const [loading, setLoading] = useState(true);

    // List all the used logos in an associative array
    interface Logos { [key: string]: string; }
    const logos: Logos = {
        discord: logoDiscord, instagram: logoInstagram, twitter: logoTwitter,
        linkedin: logoLinkedin, telegram: paperPlane, web: globeOutline, links: leafOutline, email: atOutline, facebook: logoFacebook
    }


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

    useEffect(() => {
        fetchData();
    }, [id]);

    // Loading appears while waiting for data
    if (loading) {
        return (
            <>
                <HeaderTitleBack back={''}>{t('association.title')}</HeaderTitleBack>
                <IonContent>

                    <IonTabButton disabled>
                        <IonSpinner name='circular' />
                    </IonTabButton>
                </IonContent>
            </>
        );
    }

    // We check if we have the data we want
    if (!assoData) {
        return (
            <>
                <HeaderTitleBack back={''}>{t('association.title')}</HeaderTitleBack>
                <IonContent className="ion-padding">
                    <div className="center-screen-text">
                        <IonLabel style={{ "marginBottom": "25%" }}>Aucune information n'a été trouvé</IonLabel>
                        <div>
                            <IonIcon size="large" icon={searchOutline} /> <IonIcon size="large" icon={help} />
                        </div>
                    </div>
                </IonContent>
            </>
        );
    }

    // To get all the old names and logos
    const oldNames = assoData.names.slice(1);
    const oldLogos = assoData.logos.slice(1);

    const navigateToModifyAsso = () => {
        history.push(`/association/modify/${assoData.id}`, { asso: assoData });
    };

    // Function if the user want to reload the page
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData().then(() => event.detail.complete());
    }

    /**
     * Function to know if an event is editable
     * @returns true if we can edit it and false if not
     */
    const editable = () => {
        if (!session) {
            return false;
        }

        return assoData.id === session.asso_id;
    };

    // Function to get the association icsUrl
    const icsUrl = () => {
        return 'https://tekiens.net/api/assos/' + encodeURIComponent(assoData.id) + '/events.ics';
    }

    return (
        <IonPage>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton className="detail-socials-button" style={{ '--border-color': 'white', '--background': assoData.color, '--background-activated': darkenColor(assoData.color) }}>
                    <IonIcon icon={add} />
                </IonFabButton>
                <IonFabList side="top">

                    {assoData.socials.map((social: SocialsData, index) =>

                        <IonFabButton key={index} onClick={() => window.open(social.link, '_system', 'location=yes')} className="detail-socials-button" style={{ '--border-color': 'white', '--background': assoData.color, '--background-activated': darkenColor(assoData.color) }}>
                            <IonIcon icon={logos[social.id]} style={{ color: 'white' }} />
                        </IonFabButton>
                    )}

                    <IonFabButton className="detail-socials-button" onClick={() => followAssociation(assoData.id, setIsFollowed)} id="followAsso" style={{ '--border-color': 'white', '--background': assoData.color, '--background-activated': darkenColor(assoData.color) }}>
                        <IonIcon icon={isFollowed ? starSharp : starOutline} style={{ color: 'white' }} />
                    </IonFabButton>

                    {editable() &&
                        <>
                            <IonFabButton className='fab-button' style={{ '--border-color': 'white', '--background': assoData.color, '--background-activated': darkenColor(assoData.color) }} onClick={navigateToModifyAsso}>
                                <IonIcon icon={pencilOutline} style={{ color: 'white' }} />
                            </IonFabButton>

                            <IonFabButton className='fab-button' style={{ '--border-color': 'white', '--background': assoData.color, '--background-activated': darkenColor(assoData.color) }} onClick={() => history.push("/createEvent")}>
                                <IonIcon icon={addCircleOutline} style={{ color: 'white' }} />
                            </IonFabButton>
                        </>
                    }

                </IonFabList>
            </IonFab>

            <HeaderTitleBack back={''}>{t('association.title')}</HeaderTitleBack>
            <IonContent>
                <IonRefresher slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={handleRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                <IonToast
                    trigger="followAsso"
                    position="bottom"
                    swipeGesture="vertical"
                    message={isFollowed ? t('association.favorite.add') : t('association.favorite.remove')}
                    duration={1000}
                />
                <IonGrid className="ion-padding">

                    <IonRow class="title-image">
                        <img className="detail-asso-image" width="40%" src={assoData.logos[0]} />
                        <div className="name-theme">
                            <h1 className="title" style={{ color: isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color }}>{assoData.names[0]}</h1>
                            <h4 style={{ color: isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color }} className="title">{assoData.theme}</h4>
                        </div>
                    </IonRow>

                    <IonCol />
                    <IonRow>
                        <div style={{ backgroundColor: isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, width: '100%', height: '3px' }} />
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
                            <IonButton className="center-screen-text" style={{ '--background': isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, '--background-activated': darkenColor(assoData.color) }} onClick={() => history.push("/association/" + assoData.id + "/events")}>
                                {t('association.all-events')}
                            </IonButton>
                        </IonCol>
                    </IonRow>

                    <IonCol />
                    <IonRow>
                        <div style={{ backgroundColor: isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, width: '100%', height: '3px' }} />
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

                    <IonCol />
                    <IonRow>
                        <div style={{ backgroundColor: isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, width: '100%', height: '3px' }} />
                    </IonRow>
                    <IonCol />

                    <IonRow>
                        <IonCol>
                            <IonLabel className='about-asso-title'>{t('association.agenda.title')}</IonLabel>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton
                                className="center-screen-text"
                                expand="block"
                                style={{ '--background': isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, '--background-activated': darkenColor(assoData.color) }}
                                href={icsUrl()}
                                download={"events-" + assoData.id + ".ics"}>
                                {t('association.agenda.button')}
                            </IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            {t('association.agenda.label')}
                            <IonInput type="url" value={icsUrl()} readonly />
                        </IonCol>
                    </IonRow>

                    {(oldNames.length > 0 || oldLogos.length > 0) &&
                        <>
                            <IonCol />
                            <IonRow>
                                <div style={{ backgroundColor: isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, width: '100%', height: '3px' }} />
                            </IonRow>
                            <IonCol />

                            <IonRow>
                                <IonCol>
                                    <IonLabel className='about-asso-title'>{t('association.old-informations.title')}</IonLabel>
                                </IonCol>
                            </IonRow>
                        </>
                    }

                    {oldNames.length > 0 &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonButton id="open-modal-names" className="center-screen-text" expand="block" style={{ '--background': isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, '--background-activated': darkenColor(assoData.color) }}>
                                    {t('association.old-informations.old-names.button')}
                                </IonButton>

                                <IonModal ref={modalNames} trigger="open-modal-names">
                                    <IonHeader>
                                        <IonToolbar color='primary'>
                                            <IonButtons slot="start">
                                                <IonButton onClick={() => modalNames.current?.dismiss()}>{t('association.old-informations.back')}</IonButton>
                                            </IonButtons>
                                            <IonTitle>{t('association.old-informations.old-names.title')}</IonTitle>
                                        </IonToolbar>
                                    </IonHeader>
                                    <IonContent className="ion-padding">
                                        {oldNames.map((name, index) => (
                                            <IonItem key={index} lines={index === oldNames.length - 1 ? 'none' : undefined}>
                                                {name}
                                            </IonItem>
                                        ))}
                                    </IonContent>
                                </IonModal>
                            </IonCol>
                        </IonRow>
                    }

                    {oldLogos.length > 0 &&
                        <IonRow className='info'>
                            <IonCol>
                                <IonButton id="open-modal-logos" className="center-screen-text" expand="block" style={{ '--background': isColorDark(assoData.color) ? brightenColor(assoData.color) : assoData.color, '--background-activated': darkenColor(assoData.color) }}>
                                    {t('association.old-informations.old-logos.button')}
                                </IonButton>

                                <IonModal ref={modalLogos} trigger="open-modal-logos">
                                    <IonHeader >
                                        <IonToolbar color='primary'>
                                            <IonButtons slot="start">
                                                <IonButton onClick={() => modalLogos.current?.dismiss()}>{t('association.old-informations.back')}</IonButton>
                                            </IonButtons>
                                            <IonTitle>{t('association.old-informations.old-logos.title')}</IonTitle>
                                        </IonToolbar>
                                    </IonHeader>
                                    <IonContent className="ion-padding">
                                        <div className="center-screen-text">
                                            {oldLogos.map((logos, index) => (
                                                <IonItem key={index} lines={index === oldLogos.length - 1 ? 'none' : undefined}>
                                                    <img src={logos} style={{ margin: '5%' }} />
                                                </IonItem>
                                            ))}
                                        </div>
                                    </IonContent>
                                </IonModal>
                            </IonCol>
                        </IonRow>
                    }

                </IonGrid>

                <div style={{ margin: '15%' }} />
            </IonContent>

        </IonPage >)
}

export default AssociationDetails;
