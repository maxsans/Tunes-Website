import React, { useEffect, useRef, useState } from "react";
import Btn from "../../../components/Btn/Btn";
import Logo from "../../../components/Logo/Logo";
import styles from "./About.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img from "../../../assets/AboutMock Laptop.svg";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  isMobile: boolean;
};

const TITLE_TEXT = "Where Music Meets Light";
const SUBTITLE_TEXT =
  "Tunes is a project that transforms music into light.\nBy placing sensors inside instruments, it captures sound and synchronises it with dynamic lighting effects, creating performances that are both auditory and visual.\nMusicians can fully customise their setup, bringing a new creative dimension to the stage";
const TYPING_SPEED_TITLE = 0.06;
const TYPING_SPEED_SUBTITLE = 0.03;

const About: React.FC<Props> = ({ isMobile }) => {
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    const aboutTrigger = ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top 50%",
      once: true,
      onEnter: () => {
        if (!animationStarted) {
          setAnimationStarted(true);
          startTypewriterAnimation();
        }
      },
    });

    return () => {
      aboutTrigger.kill();
    };
  }, [animationStarted]);

  const startTypewriterAnimation = () => {
    let titleTimeout: NodeJS.Timeout;
    let hideCursorTimeout1: NodeJS.Timeout;
    let showTextSectionTimeout: NodeJS.Timeout;

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

          showTextSectionTimeout = setTimeout(() => {
            if (textSectionRef.current) {
              gsap.fromTo(
                textSectionRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
              );
            }
          }, 100);
        }, 100);
      }
    }

    setTimeout(typeTitle, 300);

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(hideCursorTimeout1);
      clearTimeout(showTextSectionTimeout);
    };
  };

  return (
    <section ref={aboutRef} className={styles.aboutContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {typedTitle}
          {showCursorTitle && <span className={styles.cursor}>_</span>}
        </h1>
        <div ref={textSectionRef} className={styles.textSection}>
          <p className={styles.subtitle}>{SUBTITLE_TEXT}</p>
          <div className={styles.imageSection}>
            <img
              src={img}
              alt="Tunes Music Light Setup"
              className={styles.aboutImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
