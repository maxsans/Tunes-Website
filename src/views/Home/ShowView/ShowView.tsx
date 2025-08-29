import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ShowView.module.scss";
import Mockview from "../Mockview/Mockview";
import DetailsMockup from "../DetailsMockup/DetailsMockup";
import { DetailMockupData } from "../DetailsMockup/DetailsMockup";

interface ShowViewProps {
  isMobile?: boolean;
  sectionId: string;
  titleMockView: string;
  subtitleMockView: string;
  imgMockView: string;
  titleDetailsMockup?: string;
  modulesDetailsMockup: DetailMockupData[];
}

const ShowView: React.FC<ShowViewProps> = ({
  isMobile,
  sectionId,
  titleMockView,
  subtitleMockView,
  imgMockView,
  titleDetailsMockup = "Structure Your Light Show",
  modulesDetailsMockup,
}) => {
  const mockviewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mockviewRef.current || !containerRef.current) return;

      const detailsMockupSection = containerRef.current.querySelector(
        '[data-section="details-mockup"]'
      );
      if (!detailsMockupSection) return;

      const detailsRect = detailsMockupSection.getBoundingClientRect();
      const vH = window.innerHeight || document.documentElement.clientHeight;

      const debut = vH * 0.6;
      const fin = vH * 0.2;

      let progress = 0;
      if (detailsRect.top < debut) {
        progress = Math.min(
          1,
          Math.max(0, (debut - detailsRect.top) / (debut - fin))
        );
      }

      const blur = 22 * progress;
      const y = 20 * progress;
      const opacity = 1 - 0.66 * progress;

      gsap.to(mockviewRef.current, {
        filter: `blur(${blur}px)`,
        opacity: opacity,
        y: y,
        duration: 0.2,
        ease: "linear",
        pointerEvents: progress > 0.01 ? "none" : "auto",
        overwrite: true,
      });
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 1);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.killTweensOf(mockviewRef.current);
    };
  }, [isMobile, sectionId]);

  return (
    <div ref={containerRef} className={styles.showViewContainer}>
      <div ref={mockviewRef}>
        <Mockview
          isMobile={isMobile}
          title={titleMockView}
          subtitle={subtitleMockView}
          imgSrc={imgMockView}
          isHomeSection={sectionId === "home"}
        />
      </div>
      <div data-section="details-mockup">
        <DetailsMockup
          title={titleDetailsMockup}
          modules={modulesDetailsMockup}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default ShowView;
