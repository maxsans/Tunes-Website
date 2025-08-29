import React, { useEffect, useRef, useState } from "react";
import HomeBackground from "../../components/Background/HomeBackground";
import styles from "./HomeView.module.scss";
import Presentation from "./Presentation/Presentation";
import Features from "./Features/Features";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./About/About";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 700;

const HomeView: React.FC = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false
  );

  const presentationRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
          setTimeout(() => {
            ref.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 500);
        }
      };

      switch (hash) {
        case "#about":
          scrollToSection(aboutRef);
          break;
        case "#features":
          scrollToSection(featuresRef);
          break;
        case "#presentation":
          scrollToSection(presentationRef);
          break;
        default:
          if (!hash) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          break;
      }
    };

    const initialTimeout = setTimeout(() => {
      handleHashChange();
    }, 800);

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!presentationRef.current || !aboutRef.current) return;

    let presentationTrigger: ScrollTrigger;
    let aboutTrigger: ScrollTrigger;

    const setupTriggers = () => {
      presentationTrigger = ScrollTrigger.create({
        trigger: presentationRef.current,
        start: "bottom 50%",
        end: "bottom top",
        onEnter: () => {
          if (presentationRef.current) {
            gsap.to(presentationRef.current, {
              filter: "blur(20px)",
              opacity: 0.4,
              y: 15,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
        onLeaveBack: () => {
          if (presentationRef.current) {
            gsap.to(presentationRef.current, {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
      });

      aboutTrigger = ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "bottom 50%",
        end: "bottom top",
        onEnter: () => {
          if (aboutRef.current) {
            gsap.to(aboutRef.current, {
              filter: "blur(20px)",
              opacity: 0.4,
              y: 15,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
        onLeaveBack: () => {
          if (aboutRef.current) {
            gsap.to(aboutRef.current, {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          }
        },
      });
    };

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      setupTriggers();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (presentationTrigger) presentationTrigger.kill();
      if (aboutTrigger) aboutTrigger.kill();
    };
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.backgroundWrapper}>
        <HomeBackground isMobile={isMobile} />
      </div>
      <div className={styles.content}>
        <div ref={presentationRef} style={{ width: "100%" }} id="presentation">
          <Presentation isMobile={isMobile} />
        </div>
        <div ref={aboutRef} style={{ width: "100%" }} id="about">
          <About isMobile={isMobile} />
        </div>
        <div ref={featuresRef} style={{ width: "100%" }} id="features">
          <Features isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
