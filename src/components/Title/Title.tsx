import React, { useEffect } from "react";
import styles from "./Title.module.scss";

type TitleProps = {
  isMobile: boolean | undefined;
  children: React.ReactNode;
  showCursor?: boolean;
  customStyle?: React.CSSProperties;
  customClassName?: string;
};

const Title: React.FC<TitleProps> = ({
  isMobile,
  children,
  showCursor,
  customStyle,
  customClassName,
}) => {
  useEffect(() => {
    let blinkStyleEl = document.getElementById("title-blink-keyframes");
    if (!blinkStyleEl) {
      const style = document.createElement("style");
      style.id = "title-blink-keyframes";
      style.innerHTML = `
        @keyframes blinkBar {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const defaultStyle = {
    color: "#5784BA",
    fontSize: isMobile ? "1.65rem" : undefined,
  };

  const combinedStyle = customStyle
    ? { ...defaultStyle, ...customStyle }
    : defaultStyle;

  return (
    <h2 className={customClassName || styles.title} style={combinedStyle}>
      {children}
      {showCursor && (
        <span
          style={{
            display: "inline-block",
            width: "1ch",
            animation: "blinkBar 0.9s steps(1) infinite",
            color: "#5784BA",
          }}
          aria-hidden
        >
          _
        </span>
      )}
    </h2>
  );
};

export default Title;
