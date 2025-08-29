import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./NavBar.module.scss";
import NavBarShapes from "./NavBarShapes";
import Logo from "../Logo/Logo";
import Btn from "../Btn/Btn";
import { Link, useNavigate } from "react-router-dom";

const NAVBAR_HEIGHT = 70;
const NAVBAR_RADIUS = NAVBAR_HEIGHT / 2;
const NAVBAR_MAX_WIDTH = 1000;
const NAVBAR_SIDE_MARGIN = 0.05;

enum NavStage {
  Start,
  Crossed,
  Expanded,
}

const useResponsiveNavbarWidth = () => {
  const [width, setWidth] = useState(NAVBAR_HEIGHT);

  useEffect(() => {
    function calcWidth() {
      const maxWidth = NAVBAR_MAX_WIDTH;
      const w = Math.min(
        maxWidth,
        window.innerWidth * (1 - NAVBAR_SIDE_MARGIN * 2)
      );
      setWidth(w);
    }
    calcWidth();
    window.addEventListener("resize", calcWidth);
    return () => window.removeEventListener("resize", calcWidth);
  }, []);
  return width;
};

const NavBarDesktop: React.FC = () => {
  const [stage, setStage] = useState<NavStage>(NavStage.Start);
  const [showContent, setShowContent] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const responsiveWidth = useResponsiveNavbarWidth();

  const handleScrollTo = (sectionId: string) => {
    if (window.location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLogoClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setShowContent(false);
    const TARGET = responsiveWidth;
    const tl = gsap.timeline();
    tl.set(navRef.current, {
      width: NAVBAR_HEIGHT,
      height: NAVBAR_HEIGHT,
      borderRadius: "50%",
    });

    tl.to({}, { duration: 0.1, onStart: () => setStage(NavStage.Start) });
    tl.to({}, { duration: 0.1, onStart: () => setStage(NavStage.Crossed) });
    tl.to({}, { duration: 0.2 });
    tl.to(navRef.current, {
      width: TARGET,
      height: NAVBAR_HEIGHT,
      borderRadius: NAVBAR_RADIUS,
      duration: 0.6,
      ease: "power3.inOut",
      onStart: () => setStage(NavStage.Expanded),
      onComplete: () => setShowContent(true),
    });
    return () => {
      gsap.set(navRef.current, { clearProps: "all" });
    };
  }, [responsiveWidth]);

  useEffect(() => {
    if (showContent && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, filter: "blur(18px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.3, ease: "power1.out" }
      );
    }
  }, [showContent]);

  return (
    <div className={styles.navbarWrapper}>
      <div
        className={styles.navbarAnimRoot}
        ref={navRef}
        style={{
          width: stage === NavStage.Expanded ? responsiveWidth : NAVBAR_HEIGHT,
          height: NAVBAR_HEIGHT,
          borderRadius: stage === NavStage.Expanded ? NAVBAR_RADIUS : "50%",
          position: "relative",
          overflow: "visible",
        }}
      >
        <NavBarShapes stage={stage} mode="desktop" />
        <div
          className={styles.whiteBg}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: stage === NavStage.Expanded ? NAVBAR_RADIUS : "50%",
            zIndex: 2,
            pointerEvents: "none",
            transition: "border-radius 0.3s",
          }}
        />
        {showContent && (
          <div
            className={styles.navbarContent}
            ref={contentRef}
            style={{
              position: "relative",
              zIndex: 3,
              opacity: 0,
              filter: "blur(18px)",
            }}
          >
            <button onClick={handleLogoClick} className={styles.logo}>
              <Logo size={48} />
              <span>Tunes</span>
            </button>
            <nav className={styles.navbarLinks}>
              <button
                onClick={() => handleScrollTo("about")}
                className={styles.navLink}
              >
                About us
              </button>
              <button
                onClick={() => handleScrollTo("features")}
                className={styles.navLink}
              >
                Features
              </button>
              <Link to="/contact">Contact</Link>
            </nav>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarDesktop;
