import React, { createContext, useState, ReactNode } from
'react';
import esMessages from '../i18/es.json';
import enMessages from '../i18/en.json';


//Context
interface LanguageContextProps {
    locale: string;
    messages: Record<string, string>;
    changeLanguage: (lang: string) => void;
}

const messagesMap: { [key: string]: Record<string, string> } = {
    en: enMessages,
    es: esMessages,
};

export const LanguageContext = createContext<LanguageContextProps>({
    locale: 'en',
    messages: enMessages,
    changeLanguage: () => {},
});

//Provider
interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {

    const initialLocale = navigator.language.startsWith('es') ? 'es' : 'en';

    const [locale, setLocale] = useState<string>(initialLocale);

    const changeLanguage = (lang: string) => {
        setLocale(lang);
    };

    return (
        <LanguageContext.Provider value={{
        locale,
        messages: messagesMap[locale],
        changeLanguage }}>
                {children}
        </LanguageContext.Provider>
    );
};