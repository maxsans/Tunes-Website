import React from "react";
import { translations } from "../../constants/local";

export type TranslationKey = keyof (typeof translations)["en"];

type TranslateProps = {
  tid: TranslationKey;
  lang?: "en" | "fr";
};

const getUserLang = (): "en" | "fr" => {
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === "fr") return "fr";
  }
  return "en";
};

const Translate: React.FC<TranslateProps> = ({ tid, lang }) => {
  const language = lang || getUserLang();
  const value =
    translations[language][tid] ?? translations["en"][tid] ?? `[${tid}]`;
  return <>{value}</>;
};

export default Translate;