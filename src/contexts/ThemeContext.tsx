import { createContext, useState, useContext, useEffect, ReactNode, FC } from 'react';

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
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
    const [theme, setThemeState] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setThemeState(savedTheme);
        }
    })

    const setTheme = (newTheme: string) => {
        localStorage.setItem('theme', newTheme);
        setThemeState(newTheme);
    }

    useEffect(() => {
        document.body.classList.remove('theme-bleu', 'theme-dark');
        if (theme) {
            document.body.classList.add(theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
