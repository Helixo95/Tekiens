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
} from "@ionic/react";
import { useLocation, useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import HeaderTitleBack from "../../components/HeaderTitleBack";
import RichTextComponent from "../../components/RichTextComponent";
import ColorPicker from "../../components/ColorPicker";
import Api from "../../Tools/Api";
import { AssosData, SocialsDisplay } from "../../Tools/Interfaces/EventAndAssoInterface";
import { parseText, unParseText } from "../../Tools/DOMParser";
import { closeOutline, navigate } from "ionicons/icons";
import SocialLinks from "../../components/Socials/SocialsLinks";

const ModifyAsso: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation<{ asso: AssosData }>();
    const history = useHistory();

    const [assoData, setAssoData] = useState<AssosData | null>(null);
    const [description, setDescription] = useState<string>("");
    const [colorHexVal, setColorHexVal] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [names, setNames] = useState<Array<string>>([]);
    const [socials, setSocials] = useState<string[][]>([]);

    useEffect(() => {
        if (location.state?.asso) {
            const { asso } = location.state;
            setAssoData(asso);
            parseText(asso.description, setDescription);
            setColorHexVal(asso.color);
            setNames(asso.names);

            const targetSocials: string[][] = [];
            asso.socials.map(val => {
                const id = val.id;
                const value = val.value;

                targetSocials.push([id, value]);

            })

            setSocials(targetSocials);
        }
    }, [location.state]);

    const handleAddName = () => {
        const newNames = [...names, ""];
        setNames(newNames);
    };

    const handleNameChange = (e: CustomEvent, index: number) => {
        const newNames = [...names];
        newNames[index] = (e.target as HTMLInputElement).value;
        setNames(newNames);
    };

    const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
        const reorderedNames = event.detail.complete(names);
        setNames(reorderedNames);
    };

    const handleDeleletionClick = (index: Number) => {
        console.log(index);
        const newNames = names.filter((_, i) => i !== index); // Copy all the element except the chosen one
        setNames(newNames);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Finished Socials =>", socials);


        if (!assoData) return;

        const parsedSocials = socials.map(val => `${val[0]}:${val[1]}`);


        try {
            const formData = new FormData(e.currentTarget);
            const values: any = Object.fromEntries(formData.entries());

            if (names[0] == "") {
                console.log(names);
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
                socials: parsedSocials
            };

            console.log(updatedAsso);

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
                <HeaderTitleBack back="">{t("association.manage.modification.title")}</HeaderTitleBack>
                <IonContent>
                    <div className="ion-padding">Loading...</div>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <HeaderTitleBack back="">{t("association.manage.modification.title")}</HeaderTitleBack>
            <IonContent>
                <form className="ion-padding" onSubmit={handleSubmit}>
                    <IonItem className="input-item">
                        <IonInput
                            label="Identifiant"
                            labelPlacement="floating"
                            placeholder="id"
                            name="assoID"
                            type="text"
                            clearInput={true}
                            value={assoData.id}
                            readonly
                        />
                    </IonItem>

                    <IonButton onClick={handleAddName}>Add name !</IonButton>
                    <IonList>
                        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                            {names.map((name, index) => (
                                <IonItem key={index}>
                                    <IonInput
                                        type="text"
                                        value={name}
                                        placeholder={`Item ${index}`}
                                        onIonInput={(e) => handleNameChange(e, index)}
                                    />

                                    <IonIcon icon={closeOutline} onClick={() => handleDeleletionClick(index)} />
                                    <IonReorder slot="end"></IonReorder>
                                </IonItem>
                            ))}
                        </IonReorderGroup>
                    </IonList>

                    <IonItem className="input-item">
                        <IonInput
                            label="Thème"
                            labelPlacement="floating"
                            placeholder="theme"
                            name="theme"
                            type="text"
                            clearInput={true}
                            value={assoData.theme}
                            onIonChange={(e) => setAssoData({ ...assoData, theme: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Campus"
                            labelPlacement="floating"
                            placeholder="campus"
                            name="campus"
                            type="text"
                            clearInput={true}
                            value={assoData.campus}
                            onIonChange={(e) => setAssoData({ ...assoData, campus: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Local"
                            labelPlacement="floating"
                            placeholder="local"
                            name="local"
                            type="text"
                            clearInput={true}
                            value={assoData.room}
                            onIonChange={(e) => setAssoData({ ...assoData, room: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Creation"
                            labelPlacement="floating"
                            placeholder="creation"
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
                            label="Dissolution"
                            labelPlacement="floating"
                            placeholder="dissolution"
                            name="end"
                            type="number"
                            clearInput={true}
                            min={0}
                            value={assoData.end}
                            onIonChange={(e) => setAssoData({ ...assoData, end: e.detail.value! })}
                        />
                    </IonItem>

                    <IonItem>
                        <RichTextComponent value={description} callback={setDescription} />
                    </IonItem>

                    <IonItem>
                        <SocialLinks socials={socials} callback={setSocials} />
                    </IonItem>

                    <IonItem>
                        <ColorPicker colorVal={colorHexVal} callback={setColorHexVal} />
                    </IonItem>



                    <IonButton type="submit" className="login-item" style={{ width: "100%" }}>
                        {t("event.manage.modification.button")}
                    </IonButton>
                    <span className="error center-screen">{errorText}</span>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default ModifyAsso;