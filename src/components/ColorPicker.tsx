import { IonInput, IonItem } from '@ionic/react';
import React, { ChangeEvent } from 'react'

const ColorPicker: React.FC<{colorVal: string, callback: Function}> = ({colorVal, callback}) => {
    function handleColorChange(event: ChangeEvent<HTMLInputElement>): void {
        callback(event.target.value);
    }
    return (
        <IonItem>
        <IonInput value={"Color"} disabled={true}></IonInput>
        <input type="color" value={colorVal} onChange={handleColorChange} style={{        
            border: 'none', 
            backgroundColor: 'transparent',
            width: '250%',
            height: '55%',
        }} />
        </IonItem>

    );
}

export default ColorPicker;