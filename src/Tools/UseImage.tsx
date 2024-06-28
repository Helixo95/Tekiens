import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

const useImageHandler = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const actionResult = async (result: OverlayEventDetail) => {
        const action = result.data?.action;

        if (action && action === 'gallery') {
            try {
                await loadFromGallery();
            } catch (error) {
                console.error('Error loading image from gallery:', error);
            }
        }
    };

    const loadFromGallery = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
        });

        if (image.webPath) {
            setImageUrl(image.webPath);
        }
        else {
            setImageUrl(null);
        }
    };

    const deleteImage = () => {
        setImageUrl(null);
    };

    return {
        imageUrl,
        setImageUrl,
        actionResult,
        loadFromGallery,
        deleteImage
    };
};

export default useImageHandler;
