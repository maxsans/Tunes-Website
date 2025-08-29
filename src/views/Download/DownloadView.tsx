import React, { useState, useEffect } from "react";
import HomeBackground from "../../components/Background/HomeBackground";
import Box from "../../components/Box/Box";
import styles from "./DownloadView.module.scss";

const TYPING_SPEED = 0.08;

const DownloadView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const TITLE_TEXT = "Download";

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
    let blinkStyleEl = document.getElementById("download-blink-keyframes");
    if (!blinkStyleEl) {
      const style = document.createElement("style");
      style.id = "download-blink-keyframes";
      style.innerHTML = `
        @keyframes blinkBarDownload {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    let titleTimeout: NodeJS.Timeout;
    let hideCursorTimeout: NodeJS.Timeout;
    let showContentTimeout: NodeJS.Timeout;

    setShowCursor(true);

    let i = 0;
    function typeTitle() {
      setTypedTitle(TITLE_TEXT.slice(0, i + 1));
      if (i < TITLE_TEXT.length - 1) {
        i++;
        titleTimeout = setTimeout(typeTitle, TYPING_SPEED * 1000);
      } else {
        hideCursorTimeout = setTimeout(() => {
          setShowCursor(false);
          showContentTimeout = setTimeout(() => setShowContent(true), 200);
        }, 300);
      }
    }

    const startTimeout = setTimeout(typeTitle, 500);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(titleTimeout);
      clearTimeout(hideCursorTimeout);
      clearTimeout(showContentTimeout);
    };
  }, []);

  return (
    <div className={styles.downloadContainer}>
      <div className={styles.backgroundWrapper}>
        <HomeBackground isMobile={isMobile} />
      </div>

      <div className={styles.content}>
        <div className={styles.headerSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              {typedTitle}
              {showCursor && (
                <span
                  className={styles.cursor}
                  style={{
                    animation: "blinkBarDownload 0.9s steps(1) infinite",
                  }}
                  aria-hidden
                >
                  _
                </span>
              )}
            </h1>
          </div>
        </div>

        {showContent && (
          <div className={styles.downloadSection}>
            <div className={styles.boxGrid}>
              {!isMobile && (
                <>
                  <Box icon="windows" disabled>
                    <h3>Windows</h3>
                    <p>Not available now</p>
                  </Box>

                  <Box icon="mac" disabled>
                    <h3>Mac</h3>
                    <p>Not available now</p>
                  </Box>

                  <Box icon="linux" disabled>
                    <h3>Linux</h3>
                    <p>Not available now</p>
                  </Box>
                </>
              )}

              <Box icon="playstore" disabled>
                <h3>Play Store</h3>
                <p>Not available now</p>
              </Box>

              <Box icon="appstore" disabled>
                <h3>App Store</h3>
                <p>Not available now</p>
              </Box>

              <Box icon="soon" disabled>
                <h3>Soon</h3>
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadView;
