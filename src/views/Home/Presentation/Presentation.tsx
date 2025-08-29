import React, { useEffect, useRef, useState } from "react";
import Btn from "../../../components/Btn/Btn";
import Logo from "../../../components/Logo/Logo";
import styles from "./Presentation.module.scss";
import gsap from "gsap";
import { Link } from "react-router-dom";

type Props = {
  isMobile: boolean;
};

const NAVBAR_ANIMATION_DELAY = 1.2;

const TYPING_SPEED_TITLE = 0.1;
const TYPING_SPEED_SUB = 0.06;

const TITLE_TEXT = "Tunes";
const SUB_TEXT = "Illuminate your instruments";

const Presentation: React.FC<Props> = ({ isMobile }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [showCursorSub, setShowCursorSub] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setShowCursorTitle(true),
      NAVBAR_ANIMATION_DELAY * 1000
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let titleTimeout: NodeJS.Timeout;
    let subTimeout: NodeJS.Timeout;
    let hideCursorTimeout1: NodeJS.Timeout;
    let hideCursorTimeout2: NodeJS.Timeout;

    setTypedTitle("");
    setTypedSub("");
    setShowBtn(false);

    const start = () => {
      let i = 0;
      function typeTitle() {
        setTypedTitle(TITLE_TEXT.slice(0, i + 1));
        if (i < TITLE_TEXT.length - 1) {
          i++;
          titleTimeout = setTimeout(typeTitle, TYPING_SPEED_TITLE * 1000);
        } else {
          hideCursorTimeout1 = setTimeout(() => setShowCursorTitle(false), 400);

          if (logoRef.current) {
            gsap.fromTo(
              logoRef.current,
              { opacity: 0, filter: "blur(18px)" },
              {
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.7,
                ease: "power1.out",
              }
            );
          }
          let j = 0;
          setShowCursorSub(true);
          function typeSub() {
            setTypedSub(SUB_TEXT.slice(0, j + 1));
            if (j < SUB_TEXT.length - 1) {
              j++;
              subTimeout = setTimeout(typeSub, TYPING_SPEED_SUB * 1000);
            } else {
              hideCursorTimeout2 = setTimeout(
                () => setShowCursorSub(false),
                400
              );
              setTimeout(() => setShowBtn(true), 120);
            }
          }
          setTimeout(typeSub, 180);
        }
      }
      typeTitle();
    };

    const timer = setTimeout(start, NAVBAR_ANIMATION_DELAY * 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(titleTimeout);
      clearTimeout(subTimeout);
      clearTimeout(hideCursorTimeout1);
      clearTimeout(hideCursorTimeout2);
    };
  }, []);

  useEffect(() => {
    if (showBtn && btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.85, filter: "blur(18px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.48,
          ease: "power2.out",
          onComplete: () => {
            if (btnRef.current) btnRef.current.style.opacity = "1";
            if (btnRef.current) btnRef.current.style.filter = "blur(0px)";
          },
        }
      );
    }
  }, [showBtn]);

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        style={{ paddingTop: isMobile ? "95px" : "100px" }}
      >
        <div className={styles.title}>
          <div className={styles.titleText}>
            <h1>
              <span>{typedTitle}</span>
              {showCursorTitle && (
                <span
                  style={{
                    display: "inline-block",
                    width: "1ch",
                    animation: "blinkBar 0.9s steps(1) infinite",
                  }}
                >
                  _
                </span>
              )}
            </h1>
            <p>
              <span>{typedSub}</span>
              {showCursorSub && (
                <span
                  style={{
                    display: "inline-block",
                    width: "1ch",
                    animation: "blinkBar 0.9s steps(1) infinite",
                  }}
                >
                  _
                </span>
              )}
            </p>
          </div>
          <div ref={btnRef} style={{ minHeight: 52 }}>
            {showBtn && (
              <Link to="/download">
                <Btn
                  variant="surface"
                  icon="download"
                  iconPosition="left"
                  onClick={() => {}}
                >
                  Download
                </Btn>
              </Link>
            )}
          </div>
        </div>
        {!isMobile && (
          <div
            className={styles.logoBlock}
            ref={logoRef}
            style={{
              opacity: 0,
              filter: "blur(18px)",
              animation: "fadeInMenu 0.56s cubic-bezier(0.77,0,0.18,1)",
            }}
          >
            <Logo size={window.innerWidth < 1100 ? 250 : 350} blueShadow />
          </div>
        )}
      </div>
      <style>
        {`
        @keyframes blinkBar {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }
        `}
      </style>
    </div>
  );
};

export default Presentation;
