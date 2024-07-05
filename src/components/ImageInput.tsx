import React, { useRef, useEffect } from 'react';
import { IonButton, IonImg } from '@ionic/react';
import { useTranslation } from 'react-i18next';

interface ImagePickerProps {
    // Initial image to display
    currentImage: string | null;

    // Callback function when an image is selected
    onImageSelected: (newImage: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ currentImage, onImageSelected }) => {
    // Use for the translation
    const { t } = useTranslation();

    // Allow a reference of the input
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Reset file input value if currentImage changes to prevent caching of previous file
        if (currentImage === null && fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [currentImage]);

    // If we want to select of delete an image
    const handleFileInputChange = () => {
        // Check if we want to select or delete an image
        if (!currentImage) {
            // We get the selected file
            const files = fileInputRef.current?.files;

            // Checks if there are any files selected
            if (files && files.length > 0) {
                const file = files[0];
                const reader = new FileReader();

                reader.onloadend = () => {
                    // Transform the file in the right format
                    const base64String = reader.result?.toString() || '';
                    onImageSelected(base64String);

                    // Reset the input file to clear the selected file
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                };

                reader.readAsDataURL(file);
            }
        }
        else {
            onImageSelected("");
        }
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
            />

            {!currentImage ?
                <IonButton onClick={() => fileInputRef.current?.click()}>
                    {t('event.manage.event-poster.button.select')}
                </IonButton>
                :
                <IonButton onClick={handleFileInputChange}>
                    {t('event.manage.event-poster.button.delete')}
                </IonButton>}

            {currentImage && (
                <IonImg src={currentImage} />
            )}

        </>
    );
};

export default ImagePicker;
