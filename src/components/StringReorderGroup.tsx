import { IonButton, IonIcon, IonInput, IonItem, IonList, IonReorder, IonReorderGroup, ItemReorderEventDetail } from "@ionic/react";
import { add, closeOutline } from "ionicons/icons";
import React from "react";

/** Structure chosen to create n-number of this component that can be reordered
 * @param componentTag The Type name of the component
 * @param value String array of element used in the componentTag
 * @param callback Function, setter of the value parameter
 * @param changeMethod The method that register all the change
 * @param additionalProps The differents attributes that can be in the componentTag (color=, slot= ... As it can be seen elsewhere must be differenrent from value and callback)
 * @param onAny */
const StringReorderGroup: React.FC<{
    componentTag: any;
    value: string[];
    callback: Function;
    additionalProps: { [key: string]: any };
    changeMethod: string
}> = ({ componentTag, additionalProps, value, callback, changeMethod }) => {
    // Append the base props (value and callback) to the additional props
    const reorderProps = { ...additionalProps, callback: callback };
    function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
        const reorderedValue = event.detail.complete(value);
        callback(reorderedValue);
    }

    function addValue() {
        const valueCopy = [...value];
        valueCopy.push("");
        callback(valueCopy);
    }

    function handleDeleletionClick(index: any) {
        const filteredValue = value.filter((_, i) => index !== i);
        callback(filteredValue);
    }

    function handleChange(e: CustomEvent, index: any) {
        console.log("ChangeEvent: " + e);
        const valueCopy = [...value];
        valueCopy[index] = e.detail.value;

        callback(valueCopy);
    }

    return (
        <IonList>
            {Array.isArray(value) ? (
                <div>
                    <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                        {value.map((currentValue, index) => (
                            <IonItem key={index} lines={index === value.length - 1 ? 'none' : undefined}>
                                {React.createElement(componentTag, { ...reorderProps, value: currentValue, changeMethod: (e: CustomEvent) => handleChange(e, index) })}
                                <IonIcon icon={closeOutline} onClick={() => handleDeleletionClick(index)} />
                                <IonReorder slot="end"></IonReorder>
                            </IonItem>
                        ))}
                    </IonReorderGroup>

                    <IonButton className="login-item" onClick={addValue} expand="block"><IonIcon icon={add} /></IonButton>
                </div>) :
                (<p style={{ color: "red" }}>StringReorderGroup: Value for this tag needs to be an array and not: {typeof (value)}</p>)}
        </IonList>);
}

export default StringReorderGroup;