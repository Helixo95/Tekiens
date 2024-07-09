import React, { ReactNode, createContext, useContext, useState } from 'react';
import { AssosData } from '../Tools/Interfaces/EventAndAssoInterface';


interface AssoDataContextType {
    assoData: AssosData | null;
    setAssoData: React.Dispatch<React.SetStateAction<AssosData | null>>;
}

const AssoDataContext = createContext<AssoDataContextType | undefined>(undefined);

export const useAssoDataContext = () => {
    const context = useContext(AssoDataContext);
    if (!context) {
        throw new Error('useAssoDataContext must be used within an AssoDataProvider');
    }
    return context;
};

interface AssoDataProvider {
    children: ReactNode;
}

export const AssoDataProvider: React.FC<AssoDataProvider> = ({ children }) => {
    const [assoData, setAssoData] = useState<AssosData | null>(null);

    return (
        <AssoDataContext.Provider value={{ assoData, setAssoData }}>
            {children}
        </AssoDataContext.Provider>
    );
};