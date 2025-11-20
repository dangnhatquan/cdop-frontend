import { initReactI18next } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@models/common";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import intervalPlural from "i18next-intervalplural-postprocessor";
import resourcesToBackend from "i18next-resources-to-backend";
import Backend from "i18next-xhr-backend";

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .use(intervalPlural)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: ["common", "home", "menu", "gallery"],
    defaultNS: "common",
    fallbackLng: ["vi"],
    detection: {
      order: ["htmlTag", "cookie"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
