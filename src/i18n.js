import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import esUI from './locales/es/ui.json'
import enUI from './locales/en/ui.json'
import esCategories from './locales/es/categories.json'
import enCategories from './locales/en/categories.json'

i18n.use(initReactI18next).init({
  resources: {
    es: { ui: esUI, categories: esCategories },
    en: { ui: enUI, categories: enCategories },
  },
  lng: 'es',
  fallbackLng: 'es',
  ns: ['ui', 'categories'],
  defaultNS: 'ui',
  interpolation: { escapeValue: false },
})

export default i18n
