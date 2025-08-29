import React, { useEffect } from "react";
import styles from "./Subtitle.module.scss";

type SubtitleProps = {
  isMobile: boolean | undefined;
  children: React.ReactNode;
  showCursor?: boolean;
  customStyle?: React.CSSProperties;
  customClassName?: string;
};

const Subtitle: React.FC<SubtitleProps> = ({
  isMobile,
  children,
  showCursor,
  customStyle,
  customClassName,
}) => {
  useEffect(() => {
    let blinkStyleEl = document.getElementById("subtitle-blink-keyframes");
    if (!blinkStyleEl) {
      const style = document.createElement("style");
      style.id = "subtitle-blink-keyframes";
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
    fontSize: isMobile ? "1.05rem" : undefined,
  };

  const combinedStyle = customStyle
    ? { ...defaultStyle, ...customStyle }
    : defaultStyle;

  return (
    <div className={customClassName || styles.subtitle} style={combinedStyle}>
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
    </div>
  );
};

export default Subtitle;
