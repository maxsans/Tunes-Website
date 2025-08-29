import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeBackground from "../../components/Background/HomeBackground";
import styles from "./NotFoundView.module.scss";
import Btn from "../../components/Btn/Btn";

const TYPING_SPEED_TITLE = 0.05;
const TYPING_SPEED_SUB = 0.03;

const NotFoundView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [showCursorSubtitle, setShowCursorSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const TITLE_TEXT = "404";
  const SUBTITLE_TEXT = "Not found";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let blinkStyleEl = document.getElementById("notfound-blink-keyframes");
    if (!blinkStyleEl) {
      const style = document.createElement("style");
      style.id = "notfound-blink-keyframes";
      style.innerHTML = `
        @keyframes blinkBar404 {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    let titleTimeout: NodeJS.Timeout;
    let subTitleTimeout: NodeJS.Timeout;
    let hideCursorTimeout1: NodeJS.Timeout;
    let hideCursorTimeout2: NodeJS.Timeout;
    let showButtonTimeout: NodeJS.Timeout;

    setShowCursorTitle(true);

    let i = 0;
    function typeTitle() {
      setTypedTitle(TITLE_TEXT.slice(0, i + 1));
      if (i < TITLE_TEXT.length - 1) {
        i++;
        titleTimeout = setTimeout(typeTitle, TYPING_SPEED_TITLE * 1000);
      } else {
        hideCursorTimeout1 = setTimeout(() => {
          setShowCursorTitle(false);
          setShowCursorSubtitle(true);

          let j = 0;
          function typeSubtitle() {
            setTypedSubtitle(SUBTITLE_TEXT.slice(0, j + 1));
            if (j < SUBTITLE_TEXT.length - 1) {
              j++;
              subTitleTimeout = setTimeout(
                typeSubtitle,
                TYPING_SPEED_SUB * 1000
              );
            } else {
              hideCursorTimeout2 = setTimeout(() => {
                setShowCursorSubtitle(false);
                showButtonTimeout = setTimeout(() => setShowButton(true), 100);
              }, 100);
            }
          }
          typeSubtitle();
        }, 100);
      }
    }

    const startTimeout = setTimeout(typeTitle, 300);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(titleTimeout);
      clearTimeout(subTitleTimeout);
      clearTimeout(hideCursorTimeout1);
      clearTimeout(hideCursorTimeout2);
      clearTimeout(showButtonTimeout);
    };
  }, []);

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.backgroundWrapper}>
        <HomeBackground isMobile={isMobile} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            {typedTitle}
            {showCursorTitle && (
              <span
                className={styles.cursor}
                style={{
                  animation: "blinkBar404 0.9s steps(1) infinite",
                }}
                aria-hidden
              >
                _
              </span>
            )}
          </h1>
        </div>

        <div className={styles.subtitleContainer}>
          <p className={styles.subtitle}>
            {typedSubtitle}
            {showCursorSubtitle && (
              <span
                className={styles.cursor}
                style={{
                  animation: "blinkBar404 0.9s steps(1) infinite",
                }}
                aria-hidden
              >
                _
              </span>
            )}
          </p>
        </div>

        {showButton && (
          <div className={styles.buttonContainer}>
            <Link to="/">
              <Btn variant="primary">Go back</Btn>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFoundView;
