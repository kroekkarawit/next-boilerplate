import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { enTranslations } from "./en";
import { thTranslations } from "./th";

import { getLocalStorage } from "@/lib/utils";

let savedLanguage = "en";

const storage = getLocalStorage();

if (storage) {
  const value = storage.getItem("i18nextLng");

  savedLanguage = value || "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    th: { translation: thTranslations },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
    lookupLocalStorage: "i18nextLng",
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
