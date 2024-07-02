import { IonActionSheet, IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption } from "@ionic/react"
import React, { useEffect } from "react"
import HeaderTitleBack from "../../components/HeaderTitleBack"

import { useTranslation } from "react-i18next"
import { useLocation } from "react-router"
import useImageHandler from "../../Tools/UseImage"
import { AssosData } from "../../Tools/Interfaces/EventAndAssoInterface"

const ModifyAsso: React.FC = () => {
    // Use for the translation
    const { t } = useTranslation();

    const location = useLocation<{ asso: AssosData }>();
    const assoData: AssosData = location.state?.asso;

    if (!assoData) {
        return null;
    }

    return (
        <IonPage>
            <HeaderTitleBack back=''>{t('event.manage.modification.title')}</HeaderTitleBack>
            <IonContent>
                <form className="ion-padding">
                    <IonItem className="input-item">
                        <IonInput
                            label="Identifiant"
                            labelPlacement="floating"
                            placeholder="id"
                            name="assoID"
                            type="text"
                            clearInput={true}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Noms"
                            labelPlacement="floating"
                            placeholder="nom"
                            name="names"
                            type="text"
                            clearInput={true}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Thème"
                            labelPlacement="floating"
                            placeholder="theme"
                            name="theme"
                            type="text"
                            clearInput={true}
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
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="COLOR"
                            labelPlacement="floating"
                            placeholder="color"
                            name="color"
                            type="text"
                            clearInput={true}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Creation"
                            labelPlacement="floating"
                            placeholder="creation"
                            name="creation"
                            type="number"
                            clearInput={true}
                            min={0}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Dissolution"
                            labelPlacement="floating"
                            placeholder="dissolution"
                            name="dissolution"
                            type="number"
                            clearInput={true}
                            min={0}
                        />
                    </IonItem>

                    <IonItem className="input-item">
                        <IonInput
                            label="Description"
                            labelPlacement="floating"
                            placeholder="description"
                            name="description"
                            type="text"
                            clearInput={true}
                        />
                    </IonItem>

                    <IonButton type='submit' className='login-item' style={{ 'width': '100%' }}>{t('event.manage.modification.button')}</IonButton>
                    <span className='error center-screen'></span>
                </form>
            </IonContent>
        </IonPage >
    )
}

export default ModifyAsso