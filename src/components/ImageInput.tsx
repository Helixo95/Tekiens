import React, { useRef, useEffect } from 'react';
import { IonButton, IonImg } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import '../theme/ImageInput.css'

interface ImagePickerProps {
    // If the user want to use the initial image
    resetValue?: string | null;

    // Selected image to display
    currentImage: string | null;

    // Callback function when an image is selected
    onImageSelected: (newImage: string) => void;
}

const ImageInput: React.FC<ImagePickerProps> = ({ resetValue, currentImage, onImageSelected }) => {
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
    };

    /**
     * Function to return the right format of an image if it's come from the API or from the user's storage
     * @param imageURL the image url
     * @returns the right format for the image to display
     */
    const parseImage = (imageURL: string) => {
        if (imageURL.includes("https://tekiens.net/")) {
            return `${imageURL}?${Date.now()}`;
        }

        return imageURL;
    }

    return (
        <div key={Date.now()} className="image-input-container">
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
            />

            {!currentImage ?
                <div className='image-input-button'>
                    {resetValue
                        &&
                        <IonButton onClick={() => onImageSelected(resetValue)}>
                            Annuler
                        </IonButton>
                    }
                    <IonButton onClick={() => fileInputRef.current?.click()}>
                        {t('event.manage.event-poster.button.select')}
                    </IonButton>
                </div>
                :
                <div className='image-input-button'>
                    <IonButton onClick={() => onImageSelected("")}>
                        {t('event.manage.event-poster.button.delete')}
                    </IonButton>
                </div>
            }


            {currentImage && (
                <IonImg src={parseImage(currentImage)} />
            )}

        </div>
    );
};

export default ImageInput;
