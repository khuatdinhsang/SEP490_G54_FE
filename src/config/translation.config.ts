import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from '../assets/language/en.json'
import translationKOR from '../assets/language/kor.json'

const resources = {
    en: { translation: translationEN },
    ko: { translation: translationKOR }
};

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'ko', // if you're using a language detector, do not define the lng option
    debug: true,
    resources,
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false,
    }
})
