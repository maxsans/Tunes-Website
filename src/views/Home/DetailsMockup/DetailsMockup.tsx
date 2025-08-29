import React, { useEffect, useRef, useState } from "react";
import DetailMockup from "./DetailMockup";
import styles from "./DetailsMockup.module.scss";
import Title from "../../../components/Title/Title";

export interface DetailMockupData {
  titre: string;
  subtitle: string;
  img: string;
  position?: "left" | "right";
}

interface DetailsMockupProps {
  title: string;
  modules: DetailMockupData[];
  isMobile?: boolean;
}

const TYPING_SPEED = 0.08;

const DetailsMockup: React.FC<DetailsMockupProps> = ({
  title,
  modules,
  isMobile,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursorTitle, setShowCursorTitle] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasTriggered) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vH = window.innerHeight || document.documentElement.clientHeight;
      const triggerPoint = vH * 0.7;

      if (rect.top < triggerPoint && rect.bottom > 0) {
        setHasTriggered(true);
        setShowCursorTitle(true);

        let i = 0;
        function typeTitle() {
          setTypedTitle(title.slice(0, i + 1));
          if (i < title.length - 1) {
            i++;
            setTimeout(typeTitle, TYPING_SPEED * 1000);
          } else {
            setTimeout(() => setShowCursorTitle(false), 400);
          }
        }
        typeTitle();
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered, title]);

  return (
    <section
      ref={sectionRef}
      className={styles.detailsMockup}
      id="details-mockup-section"
    >
      <div className={styles.title}>
        <Title isMobile={isMobile} showCursor={showCursorTitle}>
          <span>{typedTitle}</span>
        </Title>
      </div>
      <div className={styles.detailsMockupModules}>
        {modules.map((mod, i) => (
          <DetailMockup
            key={i}
            titre={mod.titre}
            subtitle={mod.subtitle}
            img={mod.img}
            position={mod.position}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
};

export default DetailsMockup;
