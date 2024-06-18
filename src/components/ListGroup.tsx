import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react';
import { useState } from 'react';
import './ListGroup.css';

interface Props {
    items: string[];
    heading: string;
    onSelectecItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectecItem }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            <IonList>
                <IonListHeader>
                    <IonLabel>{heading}</IonLabel>
                </IonListHeader>
                {items.length === 0 && <p>No item found</p>}
                {items.map((item, index) => (
                    <IonItem
                        color={selectedIndex === index ? 'primary' : ''}
                        key={item}
                        onClick={() => {
                            setSelectedIndex(index)
                            onSelectecItem(item);
                        }}>
                        {item}
                    </IonItem>
                ))}
            </IonList>
        </>
    );
}

export default ListGroup;