import React, { useState, useEffect } from "react";
import HomeBackground from "../../components/Background/HomeBackground";
import styles from "./ContactView.module.scss";
import Btn from "../../components/Btn/Btn";

const TYPING_SPEED_TITLE = 0.05;
const TYPING_SPEED_SUB = 0.03;

const ContactView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [showCursorSubtitle, setShowCursorSubtitle] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const TITLE_TEXT = "Contact Us";
  const SUBTITLE_TEXT = "Let's bring your musical vision to light";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let blinkStyleEl = document.getElementById("contact-blink-keyframes");
    if (!blinkStyleEl) {
      const style = document.createElement("style");
      style.id = "contact-blink-keyframes";
      style.innerHTML = `
        @keyframes blinkBarContact {
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
    let showContentTimeout: NodeJS.Timeout;

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
                showContentTimeout = setTimeout(
                  () => setShowContent(true),
                  200
                );
              }, 300);
            }
          }
          typeSubtitle();
        }, 200);
      }
    }

    const startTimeout = setTimeout(typeTitle, 300);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(titleTimeout);
      clearTimeout(subTitleTimeout);
      clearTimeout(hideCursorTimeout1);
      clearTimeout(hideCursorTimeout2);
      clearTimeout(showContentTimeout);
    };
  }, []);

  const handleContactClick = () => {
    window.location.href = "mailto:mcmservicesoff@gmail.com";
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.backgroundWrapper}>
        <HomeBackground isMobile={isMobile} />
      </div>

      <div className={styles.content}>
        <div className={styles.headerSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              {typedTitle}
              {showCursorTitle && (
                <span
                  className={styles.cursor}
                  style={{
                    animation: "blinkBarContact 0.9s steps(1) infinite",
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
                    animation: "blinkBarContact 0.9s steps(1) infinite",
                  }}
                  aria-hidden
                >
                  _
                </span>
              )}
            </p>
          </div>
        </div>

        {showContent && (
          <div className={styles.contactSection}>
            <div className={styles.buttonContainer}>
              <Btn variant="primary" onClick={handleContactClick}>
                Send Email
              </Btn>
            </div>
            <div className={styles.emailFallback}>
              <p className={styles.fallbackText}>Or contact us directly at:</p>
              <span className={styles.emailAddress}>
                mcmservicesoff@gmail.com
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactView;
