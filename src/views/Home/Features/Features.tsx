import React, { useEffect, useRef, useState, useCallback } from "react";
import Slider from "../../../components/Slider/Slider";
import ShowView from "../ShowView/ShowView";
import styles from "./Features.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import groupMock from "../../../assets/ContainerGroupMock.svg";
import lightMock from "../../../assets/ContainerLightMock.svg";
import configurationMock from "../../../assets/ContainerConfigurationMock.svg";
import ScreenMockSVGDesktop from "../../../assets/Mockup screen desktop.svg";
import ScreenMockSVGMobile from "../../../assets/Mockup screen mobile.svg";
import ScenesMockSVGDesktop from "../../../assets/Mockup scenes desktop.svg";
import ScenesMockSVGMobile from "../../../assets/Mockup scenes mobile.svg";
import SceneMock from "../../../assets/ContainerScenes.svg";
import LiveMock from "../../../assets/ContainerLive.svg";

type Props = {
  isMobile: boolean;
};

const Features: React.FC<Props> = ({ isMobile }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  const showViewRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const TITLE_TEXT = "Control. Customize. Create.";
  const TYPING_SPEED = 0.07;

  const startTypewriterAnimation = useCallback(() => {
    let titleTimeout: NodeJS.Timeout;
    let hideCursorTimeout: NodeJS.Timeout;
    let showContentTimeout: NodeJS.Timeout;

    setShowCursorTitle(true);

    let i = 0;
    function typeTitle() {
      setTypedTitle(TITLE_TEXT.slice(0, i + 1));
      if (i < TITLE_TEXT.length - 1) {
        i++;
        titleTimeout = setTimeout(typeTitle, TYPING_SPEED * 1000);
      } else {
        hideCursorTimeout = setTimeout(() => {
          setShowCursorTitle(false);

          showContentTimeout = setTimeout(() => {
            if (contentRef.current) {
              gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
              );
            }
          }, 100);
        }, 100);
      }
    }

    setTimeout(typeTitle, 300);

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(hideCursorTimeout);
      clearTimeout(showContentTimeout);
    };
  }, [TITLE_TEXT, TYPING_SPEED]);

  useEffect(() => {
    const handleScroll = () => {
      if (!featuresRef.current || animationStarted) return;

      const rect = featuresRef.current.getBoundingClientRect();
      const vH = window.innerHeight || document.documentElement.clientHeight;
      const triggerPoint = vH * 0.6;

      if (rect.top < triggerPoint && rect.bottom > 0) {
        setAnimationStarted(true);
        startTypewriterAnimation();
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animationStarted, startTypewriterAnimation]);

  const modulesEdit = [
    {
      titre: "Groups",
      subtitle: "Organize your lights into sets or easier control",
      img: groupMock,
      position: "left" as const,
    },
    {
      titre: "Lights",
      subtitle:
        "Positioned inside or around instruments, each light supports up to three configurations with priority levels",
      img: lightMock,
      position: "right" as const,
    },
    {
      titre: "Configurations",
      subtitle:
        "Define how each light behaves with an animation, optional colors, and an optional sensor trigger",
      img: configurationMock,
      position: "left" as const,
    },
  ];

  const modulesScenes = [
    {
      titre: "Scenes",
      subtitle:
        "Switch between light setups to instantly update every configuration across all lights",
      img: SceneMock,
      position: "left" as const,
    },
    {
      titre: "Live",
      subtitle:
        "See in real time which light configurations are active across your entire setup",
      img: LiveMock,
      position: "right" as const,
    },
  ];

  const sliderSections = [
    { id: "home", label: "Modify yours lights" },
    { id: "scenes", label: "Create yours scenes" },
  ];

  const showViewConfigs = {
    home: {
      titleMockView: "Illuminate your instruments",
      subtitleMockView: "Your music can be heard",
      imgMockView: isMobile ? ScreenMockSVGMobile : ScreenMockSVGDesktop,
      titleDetailsMockup: "Structure Your Light Show",
      modulesDetailsMockup: modulesEdit,
    },
    scenes: {
      titleMockView: "Save Your Light Setup",
      subtitleMockView: "Change the whole mood with a single touch",
      imgMockView: isMobile ? ScenesMockSVGMobile : ScenesMockSVGDesktop,
      titleDetailsMockup: "Create yours scenes",
      modulesDetailsMockup: modulesScenes,
    },
  };

  const handleSectionChange = (newSection: string) => {
    if (newSection === activeSection || !showViewRef.current) return;

    gsap.to(showViewRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setActiveSection(newSection);

        gsap.fromTo(
          showViewRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  };

  return (
    <section ref={featuresRef} className={styles.featuresContainer}>
      <h1 className={styles.title}>
        {typedTitle}
        {showCursorTitle && <span className={styles.cursor}>_</span>}
      </h1>

      <div ref={contentRef} className={styles.content}>
        <Slider
          sections={sliderSections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        <div ref={showViewRef}>
          <ShowView
            isMobile={isMobile}
            key={activeSection}
            sectionId={activeSection}
            {...showViewConfigs[activeSection as keyof typeof showViewConfigs]}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
