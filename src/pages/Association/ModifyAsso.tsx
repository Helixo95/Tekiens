import React, { useState, useEffect, useRef } from "react";
import {
    IonContent,
    IonInput,
    IonItem,
    IonPage,
    IonButton,
    IonReorder,
    IonReorderGroup,
    IonList,
    ItemReorderEventDetail,
    IonIcon,
    IonTitle,
    IonLabel,
    IonAlert,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import HeaderTitleBack from "../../components/HeaderTitleBack";
import RichTextComponent from "../../components/RichTextComponent";
import ColorPicker from "../../components/ColorPicker";
import Api from "../../Tools/Api";
import { AssosData, SocialsDisplay } from "../../Tools/Interfaces/EventAndAssoInterface";
import { parseText, unParseText } from "../../Tools/DOMParser";
import { add, closeOutline, navigate } from "ionicons/icons";
import SocialLinks from "../../components/SocialsLinks";
import ImageInput from "../../components/ImageInput";
import StringReorderGroup from "../../components/StringReorderGroup";

const ModifyAsso: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation<{ asso: AssosData }>();
    const history = useHistory();

    const [assoData, setAssoData] = useState<AssosData | null>(null);
    const [description, setDescription] = useState<string>("");
    const [colorHexVal, setColorHexVal] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [names, setNames] = useState<Array<string>>([""]);
    const [socials, setSocials] = useState<string[][]>([]);
    const [images, setImages] = useState<Array<string>>([""]);
    const [showAlert, setShowAlert] = useState(false);
    const [formValues, setFormValues] = useState<any>(null);

    useEffect(() => {
        if (location.state?.asso) {
            const { asso } = location.state;
            setAssoData(asso);
            parseText(asso.description, setDescription);
            setColorHexVal(asso.color);
            setNames(asso.names);
            setImages(asso.logos);

            // Convert string based socials into a more readable array where [0] => social_id [1] => account_id
            const targetSocials: string[][] = [];
            asso.socials.map(val => {
                const id = val.id;
                const value = val.value;

                targetSocials.push([id, value]);

            })
            setSocials(targetSocials);
        }
    }, [location.state]);

    const handleAddImages = () => {
        const imagesCopy = [...images, ""];
        setImages(imagesCopy);
    };


    const handleImageChange = (newImage: string, index: any) => {
        const imagesCopy = [...images];
        imagesCopy[index] = newImage;

        setImages(imagesCopy);
    }

    const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
        const reorderImages = event.detail.complete(images);
        setImages(reorderImages);
    };

    const handleDeleletionClick = (index: Number) => {
        const imageCopy = images.filter((_, i) => i !== index); // Copy all the element except the chosen one
        setImages(imageCopy);

    }

    /**
     * Function when the user submit the form
     * @param event the submit event
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent the form automatic redirection
        event.preventDefault();

        // We update the form values with the latest we have
        setFormValues(new FormData(event.currentTarget));

        setShowAlert(true);
    };

    const confirmSubmit = async () => {
        if (!assoData) return;

        const parsedSocials = socials.map(val => `${val[0]}:${val[1]}`);


        try {
            const values: any = Object.fromEntries(formValues.entries());

            if (names[0] == "") {
                setErrorText("First name needs to be non-empty !");
                return;
            }

            const updatedAsso: Partial<AssosData> = {
                id: assoData.id,
                names: names,
                theme: values.theme || assoData.theme,
                color: colorHexVal || assoData.color,
                description: unParseText(description) || assoData.description,
                campus: values.campus || assoData.campus,
                room: values.room || assoData.room,
                start: values.start || assoData.start,
                end: values.end || assoData.end,
                socials: parsedSocials,
                logos: images,
            };


            await Api.assos.update(assoData.id, updatedAsso);

            window.location.href = `/association/${assoData.id}`;
            history.goBack();
            history.goBack();
        }

        catch (error: any) {
            if (error instanceof Error) {
                setErrorText(error.message);
            } else {
                setErrorText("Error while modifying the association, try again");
            }
        }
    };


    if (!assoData) {
        return (
            <IonPage>
                <HeaderTitleBack back="">{t("association.modification.title")}</HeaderTitleBack>
                <IonContent>
                    <div className="ion-padding">Loading...</div>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <HeaderTitleBack back="">{t("association.modification.title")}</HeaderTitleBack>
            <IonContent>
                <form className="ion-padding" onSubmit={handleSubmit}>
                    <IonItem className="input-item">
                        <IonInput
                            label={t("association.modification.asso-identifier.label")}
                            labelPlacement="floating"
                            placeholder={t("association.modification.asso-identifier.placeholder")}
                            name="assoID"
                            type="text"
                            clearInput={true}
                            value={assoData.id}
                            readonly
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel style={{ "marginBottom": "3%" }}>{t("association.modification.asso-names.label")}</IonLabel>
                            <StringReorderGroup componentTag={IonInput} value={names} callback={setNames} changeMethod="onIonInput" additionalProps=
                                {{
                                    type: "text"
                                }}
                            />
                        </div>
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel style={{ "marginBottom": "3%" }}>{t("association.modification.asso-logos.label")}</IonLabel>

                            <IonList>
                                <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                                    {images.map((img, index) => (
                                        <IonItem key={index} lines={index === images.length - 1 ? 'none' : undefined}>
                                            <ImageInput resetValue={assoData?.logos[index]} currentImage={img} onImageSelected={(val) => { handleImageChange(val, index) }} />
                                            <IonIcon icon={closeOutline} onClick={() => handleDeleletionClick(index)} style={{ "width": "100px" }} />
                                            <IonReorder slot="end"></IonReorder>
                                        </IonItem>
                                    ))}

                                </IonReorderGroup>
                            </IonList>
                            <IonButton onClick={handleAddImages} expand="block"><IonIcon icon={add} /></IonButton>
                        </div>
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t("association.modification.asso-theme.label")}
                            labelPlacement="floating"
                            placeholder={t("association.modification.asso-theme.placeholder")}
                            name="theme"
                            type="text"
                            clearInput={true}
                            value={assoData.theme}
                            onIonChange={(e) => setAssoData({ ...assoData, theme: e.detail.value! })}
                            required
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel style={{ "marginBottom": "3%" }}>{t("association.modification.asso-color.label")}</IonLabel>
                            <ColorPicker colorVal={colorHexVal} callback={setColorHexVal} />
                        </div>
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t("association.modification.asso-campus.label")}
                            labelPlacement="floating"
                            placeholder={t("association.modification.asso-campus.placeholder")}
                            name="campus"
                            type="text"
                            clearInput={true}
                            value={assoData.campus}
                            onIonChange={(e) => setAssoData({ ...assoData, campus: e.detail.value! })}
                            required
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t("association.modification.asso-room.label")}
                            labelPlacement="floating"
                            placeholder={t("association.modification.asso-room.placeholder")}
                            name="local"
                            type="text"
                            clearInput={true}
                            value={assoData.room}
                            onIonChange={(e) => setAssoData({ ...assoData, room: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t("association.modification.asso-start.label")}
                            labelPlacement="floating"
                            placeholder={t("association.modification.asso-start.placeholder")}
                            name="start"
                            type="number"
                            clearInput={true}
                            min={0}
                            value={assoData.start}
                            onIonChange={(e) => setAssoData({ ...assoData, start: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label={t("association.modification.asso-end.label")}
                            labelPlacement="floating"
                            placeholder={t("association.modification.asso-end.placeholder")}
                            name="end"
                            type="number"
                            clearInput={true}
                            min={0}
                            value={assoData.end}
                            onIonChange={(e) => setAssoData({ ...assoData, end: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel style={{ "marginBottom": "3%" }} >{t("association.modification.asso-description.label")}</IonLabel>
                            <RichTextComponent value={description} callback={setDescription} />
                        </div>
                    </IonItem>

                    <IonItem className="input-item">
                        <div>
                            <IonLabel style={{ "marginBottom": "3%" }}>{t("association.modification.asso-socials.label")}</IonLabel>
                            <SocialLinks socials={socials} callback={setSocials} />
                        </div>
                    </IonItem>

                    <IonButton type="submit" expand="block">
                        {t("association.modification.button")}
                    </IonButton>

                    <span className="error center-screen">{errorText}</span>
                </form>

                <IonAlert
                    isOpen={showAlert}
                    header={t('association.modification.alert.header')}
                    message={t('association.modification.alert.message')}
                    buttons={[
                        {
                            text: t('association.modification.alert.cancel'),
                            role: 'cancel'
                        },
                        {
                            text: t('association.modification.alert.confirm'),
                            handler: () => {
                                confirmSubmit();
                            }
                        }
                    ]}
                    onDidDismiss={() => setShowAlert(false)}
                />

            </IonContent>
        </IonPage>
    );
};

export default ModifyAsso;