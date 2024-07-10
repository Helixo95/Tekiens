import { IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';

const ColorPicker: React.FC<{ colorVal: string, callback: Function }> = ({ colorVal, callback }) => {
    const { t } = useTranslation();

    function handleColorChange(event: ChangeEvent<HTMLInputElement>): void {
        callback(event.target.value);
    }

    return (
        <>
            <input type="color" value={colorVal} onChange={handleColorChange} style={{
                border: 'none',
                backgroundColor: 'transparent',
                width: '1000%',
            }} />
        </>
    );
}

export default ColorPicker;