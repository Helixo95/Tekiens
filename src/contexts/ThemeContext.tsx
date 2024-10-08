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

    // We get the saved color and if the user want the dark theme from the local storage
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

    /**
     * Color setter
     * @param newColor the new color the user selected
     */
    const setColor = (newColor: string) => {
        localStorage.setItem('savedColor', newColor);
        setColorState(newColor);
    }

    /**
     * Dark theme setter
     * @param newDark if the user want a dark theme or not
     */
    const setDarkTheme = (newDark: string) => {
        localStorage.setItem('savedDark', newDark);
        setDarkState(newDark);
    }

    // When the color change we update it
    useEffect(() => {
        document.body.classList.remove('cyje-color', 'green-color');
        if (color) {
            document.body.classList.add(color);
        }
    }, [color]);

    // When the dark theme change we update it
    useEffect(() => {
        document.documentElement.classList.toggle('ion-palette-dark', stringToBoolean(darkTheme));
    }, [darkTheme]);

    /**
     * Function to transform a string to a boolean
     * @param value the string we want to convert
     * @returns true if we have "true" and false if not
     */
    const stringToBoolean = (value: string): boolean => {
        return value.toLowerCase() === 'true';
    };

    return (
        <ThemeContext.Provider value={{ color, setColor, darkTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
