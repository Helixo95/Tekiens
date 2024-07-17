import React, { useEffect, useState } from 'react';
import { IonInput, IonLabel, IonRow } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import '../theme/DurationInput.css'

interface DurationInputProps {
    // Initial duration
    initialValue: number;

    // Callback function when the duration change
    onUpdate: (totalMinutes: number) => void;
}

const DurationInput: React.FC<DurationInputProps> = ({ initialValue, onUpdate }) => {
    // Used to translate the page
    const { t } = useTranslation();

    const [days, setDays] = useState<number>(Math.floor(initialValue / 60 / 24));
    const [hours, setHours] = useState<number>(Math.floor(initialValue / 60 % 24));
    const [minutes, setMinutes] = useState<number>(initialValue % 60);

    // If the initial value change we update it
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
        <div>
            <div className="duration-input-item">
                <IonInput
                    value={days.toString()}
                    type="number"
                    min={0}
                    placeholder="-"
                    onIonChange={handleDaysChange}
                />
                <IonLabel className="input-label">
                    {t('event.manage.event-duration.days.label')}{days > 1 ? 's' : ''}
                </IonLabel>
            </div>
            <div className="duration-input-item">
                <IonInput
                    value={hours.toString()}
                    type="number"
                    min={0}
                    max={23}
                    placeholder="-"
                    onIonChange={handleHoursChange}
                />
                <IonLabel className="input-label">
                    {t('event.manage.event-duration.hours.label')}{hours > 1 ? 's' : ''}
                </IonLabel>
            </div>
            <div className="duration-input-item">
                <IonInput
                    value={minutes.toString()}
                    type="number"
                    min={0}
                    max={59}
                    placeholder="-"
                    onIonChange={handleMinutesChange}
                />
                <IonLabel className="input-label">
                    {t('event.manage.event-duration.minutes.label')}{minutes > 1 ? 's' : ''}
                </IonLabel>
            </div>
        </div>
    );
};

export default DurationInput;