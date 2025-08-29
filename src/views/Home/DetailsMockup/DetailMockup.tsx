import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./DetailMockup.module.scss";

interface DetailMockupProps {
  titre: string;
  subtitle: string;
  img: string;
  position?: "left" | "right";
  isMobile?: boolean;
}

const DetailMockup: React.FC<DetailMockupProps> = ({
  titre,
  subtitle,
  img,
  position = "left",
  isMobile,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || hasAnimated) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vH = window.innerHeight || document.documentElement.clientHeight;
      const triggerPoint = vH * 0.6;

      if (rect.top < triggerPoint && rect.bottom > 0) {
        setHasAnimated(true);

        if (textRef.current) {
          gsap.fromTo(
            textRef.current,
            {
              opacity: 0,
              x: position === "left" ? -50 : 50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            }
          );
        }

        if (imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            {
              opacity: 0,
              x: position === "left" ? 50 : -50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
            }
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated, position]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vH = window.innerHeight || document.documentElement.clientHeight;

      const debut = isMobile ? -vH * 0.3 : -vH * 0.1;
      const fin = isMobile ? -vH * 0.5 : -vH * 0.3;

      let progress = 0;
      if (rect.top < debut) {
        progress = Math.min(1, Math.max(0, (debut - rect.top) / (debut - fin)));
      }

      const blur = 10 * progress;
      const y = -20 * progress;
      const opacity = 1 - 0.4 * progress;

      gsap.to(containerRef.current, {
        filter: `blur(${blur}px)`,
        opacity: opacity,
        y: y,
        duration: 0.2,
        ease: "linear",
        pointerEvents: progress > 0.3 ? "none" : "auto",
        overwrite: true,
      });
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 1);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ flexDirection: position === "left" ? "row" : "row-reverse" }}
    >
      <div
        ref={textRef}
        className={styles.textContainer}
        data-element="text"
        style={{
          textAlign: position === "left" ? "left" : "right",
          alignItems: position === "left" ? "flex-start" : "flex-end",
          opacity: 0,
        }}
      >
        <h3 className={styles.title}>{titre}</h3>
        <div className={styles.subtitle}>
          <span>{subtitle}</span>
        </div>
      </div>
      <div
        ref={imgRef}
        className={styles.img}
        data-element="img"
        style={{
          opacity: 0,
        }}
      >
        <img
          src={img}
          alt="img mock"
          className={styles.mockSvg}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default DetailMockup;
