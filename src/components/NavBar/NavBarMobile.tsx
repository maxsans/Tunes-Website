import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./NavBar.module.scss";
import NavBarShapes from "./NavBarShapes";
import Logo from "../Logo/Logo";
import Btn from "../Btn/Btn";
import BurgerToCrossButton from "./BurgerToCrossButton";
import { Link, useNavigate } from "react-router-dom";

const NAVBAR_HEIGHT = 60;
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

const NavBarMobile: React.FC = () => {
  const [stage, setStage] = useState<NavStage>(NavStage.Start);
  const [showContent, setShowContent] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const responsiveWidth = useResponsiveNavbarWidth();

  const handleScrollTo = (sectionId: string) => {
    handleCloseMenu();

    if (window.location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
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
    if (showContent && contentRef.current && crossRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        [contentRef.current, crossRef.current],
        { opacity: 0, filter: "blur(18px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power1.out" }
      );
    }
  }, [showContent]);

  useEffect(() => {
    if (mobileMenuOpen) setMobileMenuVisible(true);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuVisible && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [mobileMenuVisible]);

  const handleCloseMenu = () => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setMobileMenuVisible(false),
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (mobileMenuOpen || mobileMenuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, mobileMenuVisible]);

  return (
    <div className={styles.navbarWrapperMobile}>
      <div
        className={styles.navbarAnimRoot}
        ref={navRef}
        style={{
          width: stage === NavStage.Expanded ? responsiveWidth : NAVBAR_HEIGHT,
          height: NAVBAR_HEIGHT,
          borderRadius: stage === NavStage.Expanded ? NAVBAR_RADIUS : "50%",
          position: "absolute",
          top: 10,
          left: `${NAVBAR_SIDE_MARGIN * 100}vw`,
          transition: "border-radius 0.3s",
          overflow: "visible",
        }}
      >
        <NavBarShapes stage={stage} mode="mobile" />
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
            className={styles.navbarContentMobile}
            ref={contentRef}
            style={{
              position: "relative",
              zIndex: 3,
              opacity: 0,
              filter: "blur(18px)",
            }}
          >
            <button onClick={handleLogoClick} className={styles.logoMobile}>
              <Logo size={30} />
              <span className={styles.mobileBrand}>Tunes</span>
            </button>
          </div>
        )}
      </div>
      {mobileMenuVisible && (
        <div className={styles.mobileMenuOverlay} ref={mobileMenuRef}>
          <svg
            className={styles.overlayBgSvg}
            width="100%"
            height="100%"
            viewBox="0 0 393 852"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
              pointerEvents: "none",
            }}
            preserveAspectRatio="none"
          >
            <rect width="393" height="852" fill="url(#paint0_radial_53_415)" />
            <rect width="393" height="852" fill="url(#paint1_radial_53_415)" />
            <defs>
              <radialGradient
                id="paint0_radial_53_415"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(393 852) rotate(-124.25) scale(894.635 922.726)"
              >
                <stop stopColor="#F7F6CF" stopOpacity="0.7" />
                <stop offset="1" stopColor="#F7F6CF" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint1_radial_53_415"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(18.5 16) rotate(54.5458) scale(558.57 1164.89)"
              >
                <stop stopColor="#9AC8EB" />
                <stop offset="1" stopColor="#9AC8EB" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileMenuLinks}>
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
              <Link to="/contact" onClick={handleCloseMenu}>
                Contact
              </Link>
            </nav>
            <Link to="/download" onClick={handleCloseMenu}>
              <Btn
                variant="surface"
                icon="download"
                iconPosition="left"
                style={{ width: "100%", marginTop: 16 }}
                onClick={() => {}}
              >
                Download
              </Btn>
            </Link>
          </div>
        </div>
      )}
      <div
        ref={crossRef}
        style={{
          position: "relative",
          zIndex: 30,
          opacity: 0,
        }}
      >
        <BurgerToCrossButton
          opened={mobileMenuOpen}
          onClick={() => {
            if (mobileMenuOpen) handleCloseMenu();
            else setMobileMenuOpen(true);
          }}
          className={styles.burgerOverlayFixed}
        />
      </div>
    </div>
  );
};

export default NavBarMobile;
