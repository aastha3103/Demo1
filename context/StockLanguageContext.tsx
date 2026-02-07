import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { STOCK_TRANSLATIONS } from '../constants/stockTranslations';

type Language = 'en' | 'hi';

interface StockLanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => any;
}

const StockLanguageContext = createContext<StockLanguageContextType | undefined>(undefined);

export const StockLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLang = await AsyncStorage.getItem('stock_language');
            if (savedLang === 'hi' || savedLang === 'en') {
                setLanguageState(savedLang);
            }
        } catch (error) {
            console.error('Failed to load language', error);
        }
    };

    const setLanguage = async (lang: Language) => {
        setLanguageState(lang);
        try {
            await AsyncStorage.setItem('stock_language', lang);
        } catch (error) {
            console.error('Failed to save language', error);
        }
    };

    const t = (path: string) => {
        const keys = path.split('.');
        let result = STOCK_TRANSLATIONS[language];
        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key];
            } else {
                return path;
            }
        }
        return result !== undefined ? result : path;
    };

    return (
        <StockLanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </StockLanguageContext.Provider>
    );
};

export const useStockLanguage = () => {
    const context = useContext(StockLanguageContext);
    if (!context) {
        throw new Error('useStockLanguage must be used within a StockLanguageProvider');
    }
    return context;
};
