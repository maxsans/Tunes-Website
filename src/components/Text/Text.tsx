import React from "react";
import { translations } from "../../constants/translations";
import styles from "./Text.module.scss";

type SupportedLang = "en" | "fr";
type TextTags =
  | "span"
  | "p"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em"
  | "small";

export type TranslationKey = keyof (typeof translations)["en"];

type TextProps = React.HTMLAttributes<HTMLElement> & {
  tid: TranslationKey;
  lang?: SupportedLang;
  as?: TextTags;
  className?: string;
  style?: React.CSSProperties;
};

const getUserLang = (): SupportedLang => {
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === "fr") return "fr";
  }
  return "en";
};

const Text: React.FC<TextProps> = ({
  tid,
  lang,
  as = "span",
  className = "",
  style,
  ...rest
}) => {
  const language: SupportedLang = lang || getUserLang();
  const value =
    translations[language][tid] ?? translations["en"][tid] ?? `[${tid}]`;
  const Tag = as;
  return (
    <Tag
      className={`${styles.textDefault} ${className}`}
      style={style}
      {...rest}
    >
      {value}
    </Tag>
  );
};

export default Text;