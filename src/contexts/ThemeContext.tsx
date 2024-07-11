import { createContext, useState, useContext, useEffect, ReactNode, FC } from 'react';

type ThemeContextType = {
    color: string;
    setColor: (color: string) => void;
    darkTheme: string;
    setDarkTheme: (darkTheme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [color, setColorState] = useState('');
    const [darkTheme, setDarkState] = useState('');

    useEffect(() => {
        const savedColor = localStorage.getItem('savedColor');
        const savedDark = localStorage.getItem('savedDark');

        if (savedColor) {
            setColorState(savedColor);
        }
        if (savedDark) {
            setDarkState(savedDark);
        }
    }, [])

    const setColor = (newColor: string) => {
        localStorage.setItem('savedColor', newColor);
        setColorState(newColor);
    }

    const setDarkTheme = (newDark: string) => {
        localStorage.setItem('savedDark', newDark);
        setDarkState(newDark);
    }

    useEffect(() => {
        document.body.classList.remove('blue-color', 'green-color');
        if (color) {
            document.body.classList.add(color);
        }
    }, [color]);

    useEffect(() => {
        document.documentElement.classList.toggle('ion-palette-dark', stringToBoolean(darkTheme));
    }, [darkTheme]);

    const stringToBoolean = (value: string): boolean => {
        return value.toLowerCase() === 'true';
    };

    return (
        <ThemeContext.Provider value={{ color, setColor, darkTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
