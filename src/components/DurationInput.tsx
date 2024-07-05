import React, { useEffect, useState } from 'react';
import { IonInput, IonLabel } from '@ionic/react';
import { useTranslation } from 'react-i18next';

interface DurationInputProps {
    // Initial duration
    initialValue: number;

    // Callback function when the duration change
    onUpdate: (totalMinutes: number) => void;
}

const DurationInput: React.FC<DurationInputProps> = ({ initialValue, onUpdate }) => {
    // Use for the translation
    const { t } = useTranslation();

    const [days, setDays] = useState<number>(Math.floor(initialValue / 60 / 24));
    const [hours, setHours] = useState<number>(Math.floor(initialValue / 60 % 24));
    const [minutes, setMinutes] = useState<number>(initialValue % 60);

    useEffect(() => {
        setDays(Math.floor(initialValue / 60 / 24));
        setHours(Math.floor(initialValue / 60 % 24));
        setMinutes(initialValue % 60);
    }, [initialValue]);

    // If the days, hours or minutes change we update the duration
    useEffect(() => {
        const totalMinutes = (days * 24 * 60) + (hours * 60) + minutes;
        onUpdate(totalMinutes);
    }, [days, hours, minutes]);

    /**
     * Function when the days changed
     * @param event the IonChange event
     */
    const handleDaysChange = (event: CustomEvent) => {
        // We get the value
        const value = parseInt(event.detail.value!, 10) || 0;

        // And update it
        setDays(value);
    };

    /**
     * Function when the hours changed
     * @param event the IonChange event
     */
    const handleHoursChange = (event: CustomEvent) => {
        const value = parseInt(event.detail.value!, 10) || 0;
        setHours(value);
    };

    /**
     * Function when the minutes changed
     * @param event the IonChange event
     */
    const handleMinutesChange = (event: CustomEvent) => {
        const value = parseInt(event.detail.value!, 10) || 0;
        setMinutes(value);
    };

    return (
        <>
            <div>
                <IonLabel position="stacked">
                    {t('event.manage.event-duration.days.label')}{days > 1 ? 's' : ''}
                </IonLabel>
                <IonInput
                    value={days.toString()}
                    type="number"
                    min={0}
                    placeholder="-"
                    onIonChange={handleDaysChange}
                />
            </div>
            <div>
                <IonLabel position="stacked">
                    {t('event.manage.event-duration.hours.label')}{hours > 1 ? 's' : ''}
                </IonLabel>
                <IonInput
                    value={hours.toString()}
                    type="number"
                    min={0}
                    max={23}
                    placeholder="-"
                    onIonChange={handleHoursChange}
                />
            </div>
            <div>
                <IonLabel position="stacked">
                    {t('event.manage.event-duration.minutes.label')}{minutes > 1 ? 's' : ''}
                </IonLabel>
                <IonInput
                    value={minutes.toString()}
                    type="number"
                    min={0}
                    max={59}
                    placeholder="-"
                    onIonChange={handleMinutesChange}
                />
            </div>

        </>
    );
};

export default DurationInput;