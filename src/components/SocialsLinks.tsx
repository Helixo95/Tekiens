import { IonButton, IonIcon, IonInput, IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import { add, closeOutline } from 'ionicons/icons';
import React from 'react';
import { SocialsData, SocialType } from '../Tools/Interfaces/EventAndAssoInterface';

const SocialLinks: React.FC<{ socials: SocialsData[], callback: Function }> = ({ socials, callback }) => {
    // Change the type of social of the current socials index
    function handleSocialChange(e: CustomEvent, index: any) {
        // Copy the values of the array, modify them and update 'socials' thanks to its callback setter
        const copy = [...socials];
        copy[index] = { ...copy[index], id: e.detail.value };

        callback(copy);
    }

    function handleSocialIDChange(e: CustomEvent, index: any) {
        const copy = [...socials];
        copy[index] = { ...copy[index], value: e.detail.value };

        callback(copy);
    }

    // Add a single entry to the social array
    function handleAdding() {
        const socialsCopy = [...socials];
        socialsCopy.push({ id: "", display: "", link: "", value: "" });

        callback(socialsCopy);
    }

    // Delete a single entry of the socials array
    function handleDelelition(index: any) {
        const socialsCopy = socials.filter((_, currentIndex) => (currentIndex != index));
        callback(socialsCopy);
    }

    return (
        <div>
            <IonButton slot='end' onClick={handleAdding} expand="block"><IonIcon icon={add} /></IonButton>
            <IonList>
                {
                    socials.map((social, index) => (
                        <IonItem key={index} lines={index === socials.length - 1 ? 'none' : undefined}>
                            <IonIcon slot='end' icon={closeOutline} onClick={() => handleDelelition(index)} />

                            <IonInput
                                type="text"
                                onIonInput={(e) => handleSocialIDChange(e, index)}
                                placeholder="Id"
                                value={social.value}
                            />

                            <IonSelect
                                interface='popover'
                                onIonChange={(e) => handleSocialChange(e, index)}
                                placeholder="Select"
                                value={social.id}
                            >
                                {Object.values(SocialType).map((SocialVal, index) => (
                                    <IonSelectOption key={index} value={SocialVal}>{SocialVal}</IonSelectOption>
                                ))}
                            </IonSelect>

                        </IonItem>
                    ))
                }
            </IonList>
        </div>
    );
}

export default SocialLinks;
