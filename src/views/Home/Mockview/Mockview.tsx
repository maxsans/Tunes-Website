import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Mockview.module.scss";
import Title from "../../../components/Title/Title";
import Subtitle from "../../../components/Title/Subtitle";

const TYPING_SPEED_TITLE = 0.06;
const TYPING_SPEED_SUB = 0.05;
const DOTS_SPEED = 0.2;
const DELAY_BETWEEN_SUBS = 500;

type Props = {
  isMobile?: boolean;
  title?: string;
  subtitle?: string;
  imgSrc: string;
  isHomeSection?: boolean;
};

const Mockview: React.FC<Props> = ({
  isMobile,
  title = "Illuminate your instruments",
  subtitle = "Your music can be heard",
  imgSrc,
  isHomeSection = false,
}) => {
  const svgRef = useRef<HTMLImageElement>(null);

  const SUB_PREFIX = subtitle;
  const SUB_DOTS = isHomeSection ? "..." : "";
  const SUB_SUFFIX = isHomeSection ? "and seen" : "";
  const TITLE_TEXT = title;

  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubPrefix, setTypedSubPrefix] = useState("");
  const [typedDots, setTypedDots] = useState("");
  const [typedSubSuffix, setTypedSubSuffix] = useState("");
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [showCursorSubPrefix, setShowCursorSubPrefix] = useState(false);
  const [showCursorDots, setShowCursorDots] = useState(false);
  const [showCursorSubSuffix, setShowCursorSubSuffix] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    let blinkStyleEl = document.getElementById("mockview-blink-keyframes");
    if (!blinkStyleEl) {
      const style = document.createElement("style");
      style.id = "mockview-blink-keyframes";
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
      const el = document.getElementById("mockview-section");
      if (!el || hasTriggered) return;
      const rect = el.getBoundingClientRect();
      const vH = window.innerHeight || document.documentElement.clientHeight;
      const startPx = isMobile ? vH * 0.85 : vH * 0.75;
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
    let subPrefixTimeout: NodeJS.Timeout;
    let dotsTimeouts: NodeJS.Timeout[] = [];
    let subSuffixTimeout: NodeJS.Timeout;
    let hideCursorTimeout1: NodeJS.Timeout;
    let hideCursorTimeout2: NodeJS.Timeout;
    let hideCursorTimeout3: NodeJS.Timeout;
    let hideCursorTimeout4: NodeJS.Timeout;
    let svgAnimTimeout: NodeJS.Timeout;

    setTypedTitle("");
    setTypedSubPrefix("");
    setTypedDots("");
    setTypedSubSuffix("");
    setShowCursorTitle(true);
    setShowCursorSubPrefix(false);
    setShowCursorDots(false);
    setShowCursorSubSuffix(false);

    let i = 0;
    function typeTitle() {
      setTypedTitle(TITLE_TEXT.slice(0, i + 1));
      if (i < TITLE_TEXT.length - 1) {
        i++;
        titleTimeout = setTimeout(typeTitle, TYPING_SPEED_TITLE * 1000);
      } else {
        hideCursorTimeout1 = setTimeout(() => setShowCursorTitle(false), 400);

        let j = 0;
        setShowCursorSubPrefix(true);
        function typeSubPrefix() {
          setTypedSubPrefix(SUB_PREFIX.slice(0, j + 1));
          if (j < SUB_PREFIX.length - 1) {
            j++;
            subPrefixTimeout = setTimeout(
              typeSubPrefix,
              TYPING_SPEED_SUB * 1000
            );
          } else {
            hideCursorTimeout2 = setTimeout(
              () => setShowCursorSubPrefix(false),
              400
            );

            if (SUB_DOTS) {
              setShowCursorDots(true);
              let dots = "";
              let step = 0;
              function typeDots() {
                dots += ".";
                setTypedDots(dots);
                if (step < SUB_DOTS.length - 1) {
                  step++;
                  dotsTimeouts[step] = setTimeout(typeDots, DOTS_SPEED * 1000);
                } else {
                  hideCursorTimeout3 = setTimeout(
                    () => setShowCursorDots(false),
                    400
                  );

                  if (SUB_SUFFIX) {
                    setTimeout(() => {
                      let k = 0;
                      setShowCursorSubSuffix(true);
                      function typeSubSuffix() {
                        setTypedSubSuffix(SUB_SUFFIX.slice(0, k + 1));
                        if (k < SUB_SUFFIX.length - 1) {
                          k++;
                          subSuffixTimeout = setTimeout(
                            typeSubSuffix,
                            TYPING_SPEED_SUB * 1000
                          );
                        } else {
                          hideCursorTimeout4 = setTimeout(
                            () => setShowCursorSubSuffix(false),
                            400
                          );
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
                      typeSubSuffix();
                    }, DELAY_BETWEEN_SUBS);
                  } else {
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
                    }, DELAY_BETWEEN_SUBS);
                  }
                }
              }
              typeDots();
            } else {
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
              }, DELAY_BETWEEN_SUBS);
            }
          }
        }
        setTimeout(typeSubPrefix, 180);
      }
    }
    typeTitle();

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(subPrefixTimeout);
      dotsTimeouts.forEach((t) => clearTimeout(t));
      clearTimeout(subSuffixTimeout);
      clearTimeout(hideCursorTimeout1);
      clearTimeout(hideCursorTimeout2);
      clearTimeout(hideCursorTimeout3);
      clearTimeout(hideCursorTimeout4);
      clearTimeout(svgAnimTimeout);
    };
  }, [hasTriggered]);

  return (
    <section className={styles.mockviewSection} id="mockview-section">
      <div className={styles.textContainer}>
        <Title isMobile={isMobile} showCursor={showCursorTitle}>
          <span>{typedTitle}</span>
        </Title>
        <Subtitle isMobile={isMobile} showCursor={showCursorSubPrefix}>
          <span>{typedSubPrefix}</span>
          <span
            style={{
              letterSpacing: "0.38em",
              display: "inline-block",
              minWidth: "1.7em",
            }}
          >
            {typedDots}
          </span>
          {showCursorDots && (
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
          <span>
            {typedSubSuffix && (
              <>
                <b>{typedSubSuffix}</b>
                {showCursorSubSuffix && (
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
              </>
            )}
          </span>
        </Subtitle>
      </div>
      <div className={styles.svgContainer}>
        <img
          ref={svgRef}
          src={imgSrc}
          alt="Screen mock"
          className={styles.mockSvg}
          draggable={false}
          style={{ opacity: 0 }}
        />
      </div>
    </section>
  );
};

export default Mockview;
