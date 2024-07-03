import React, { ReactNode, createContext, useContext, useState } from 'react';
import { EventData } from '../Tools/Interfaces/EventAndAssoInterface';


interface EventDataContextType {
    eventData: EventData | null;
    setEventData: React.Dispatch<React.SetStateAction<EventData | null>>;
}

const EventDataContext = createContext<EventDataContextType | undefined>(undefined);

export const useEventDataContext = () => {
    const context = useContext(EventDataContext);
    if (!context) {
        throw new Error('useEventDataContext must be used within an EventDataProvider');
    }
    return context;
};

interface EventDataProvider {
    children: ReactNode;
}

export const EventDataProvider: React.FC<EventDataProvider> = ({ children }) => {
    const [eventData, setEventData] = useState<EventData | null>(null);

    return (
        <EventDataContext.Provider value={{ eventData, setEventData }}>
            {children}
        </EventDataContext.Provider>
    );
};