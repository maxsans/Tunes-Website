import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./ThemeMock.module.scss";
import ScreenMockSVGDesktop from "../../../assets/Mockup screen theme desktop.svg";
import ScreenMockSVGMobile from "../../../assets/Mockup screen theme mobile.svg";

const TITLE_TEXT = "Save Your Light Setup";
const SUB_TEXT = "Change the whole mood with a single touch";
const TYPING_SPEED_TITLE = 0.05;
const TYPING_SPEED_SUB = 0.04;
const DELAY_BETWEEN_TITLE_AND_SUB = 500;

type Props = {
  isMobile?: boolean;
  onTextDisplayed?: () => void;
};

const ThemeMock: React.FC<Props> = ({ isMobile, onTextDisplayed }) => {
  const svgRef = useRef<HTMLImageElement>(null);

  const [typedTitle, setTypedTitle] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [showCursorSub, setShowCursorSub] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    let blinkStyleEl = document.getElementById("thememock-blink-keyframes");
    if (!blinkStyleEl) {
      const style = document.createElement("style");
      style.id = "thememock-blink-keyframes";
      style.innerHTML = `
        @keyframes blinkBar {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("thememock-section");
      if (!el || hasTriggered) return;
      const rect = el.getBoundingClientRect();
      const vH = window.innerHeight || document.documentElement.clientHeight;
      const startPx = isMobile ? vH * 0.5 : vH * 0.6;
      if (rect.top < startPx && rect.bottom > 0) {
        setHasTriggered(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasTriggered, isMobile]);

  useEffect(() => {
    if (!hasTriggered) return;
    let titleTimeout: NodeJS.Timeout;
    let subTimeout: NodeJS.Timeout;
    let hideCursorTimeout1: NodeJS.Timeout;
    let hideCursorTimeout2: NodeJS.Timeout;
    let svgAnimTimeout: NodeJS.Timeout;

    setTypedTitle("");
    setTypedSub("");
    setShowCursorTitle(true);
    setShowCursorSub(false);

    let i = 0;
    function typeTitle() {
      setTypedTitle(TITLE_TEXT.slice(0, i + 1));
      if (i < TITLE_TEXT.length - 1) {
        i++;
        titleTimeout = setTimeout(typeTitle, TYPING_SPEED_TITLE * 1000);
      } else {
        hideCursorTimeout1 = setTimeout(() => setShowCursorTitle(false), 400);

        setTimeout(() => {
          let j = 0;
          setShowCursorSub(true);
          function typeSub() {
            setTypedSub(SUB_TEXT.slice(0, j + 1));
            if (j < SUB_TEXT.length - 1) {
              j++;
              subTimeout = setTimeout(typeSub, TYPING_SPEED_SUB * 1000);
            } else {
              hideCursorTimeout2 = setTimeout(() => {
                setShowCursorSub(false);
                if (onTextDisplayed) onTextDisplayed();
              }, 400);
              svgAnimTimeout = setTimeout(() => {
                if (svgRef.current) {
                  gsap.fromTo(
                    svgRef.current,
                    { opacity: 0, y: 60, filter: "blur(32px)" },
                    {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      duration: 1,
                      ease: "power2.out",
                    }
                  );
                }
              }, 200);
            }
          }
          typeSub();
        }, DELAY_BETWEEN_TITLE_AND_SUB);
      }
    }
    typeTitle();

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(subTimeout);
      clearTimeout(hideCursorTimeout1);
      clearTimeout(hideCursorTimeout2);
      clearTimeout(svgAnimTimeout);
    };
  }, [hasTriggered, onTextDisplayed]);

  return (
    <section className={styles.mockviewSection} id="thememock-section">
      <div className={styles.textContainer}>
        <h2
          className={styles.title}
          style={{
            color: "#5784BA",
            fontSize: isMobile ? "1.65rem" : undefined,
          }}
        >
          <span>{typedTitle}</span>
          {showCursorTitle && (
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
        <div
          className={styles.subtitle}
          style={{
            color: "#5784BA",
            fontSize: isMobile ? "1.05rem" : undefined,
          }}
        >
          <span>{typedSub}</span>
          {showCursorSub && (
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
      </div>
      <div className={styles.svgContainer}>
        <img
          ref={svgRef}
          src={isMobile ? ScreenMockSVGMobile : ScreenMockSVGDesktop}
          alt="Theme screen mock"
          className={styles.mockSvg}
          draggable={false}
          style={{ opacity: 0 }}
        />
      </div>
    </section>
  );
};

export default ThemeMock;
