import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { MF_TRANSLATIONS } from '../constants/mfTranslations';

type Language = 'en' | 'hi';

interface MFLanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (path: string) => any;
}

const MFLanguageContext = createContext<MFLanguageContextType | undefined>(undefined);

export const MFLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLang = await AsyncStorage.getItem('mf_language');
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
            await AsyncStorage.setItem('mf_language', lang);
        } catch (error) {
            console.error('Failed to save language', error);
        }
    };

    const t = (path: string) => {
        const keys = path.split('.');
        let result = MF_TRANSLATIONS[language];
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
        <MFLanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </MFLanguageContext.Provider>
    );
};

export const useMFLanguage = () => {
    const context = useContext(MFLanguageContext);
    if (!context) {
        throw new Error('useMFLanguage must be used within a MFLanguageProvider');
    }
    return context;
};
