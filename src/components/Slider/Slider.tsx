import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./Slider.module.scss";

interface SliderSection {
  id: string;
  label: string;
}

interface SliderProps {
  sections: SliderSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const Slider: React.FC<SliderProps> = ({
  sections,
  activeSection,
  onSectionChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicatorRef.current || !sliderRef.current) return;

    const activeIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    if (activeIndex === -1) return;

    const totalSections = sections.length;
    const sliderWidth = sliderRef.current.offsetWidth;
    const isMobile = window.innerWidth <= 768;
    const paddingPerSide = isMobile ? 6 : 8;

    const availableWidth = sliderWidth - paddingPerSide * 2;
    const sectionWidth = availableWidth / totalSections;

    const translateXPixels = activeIndex * sectionWidth;

    gsap.set(indicatorRef.current, {
      width: `${sectionWidth}px`,
    });

    gsap.to(indicatorRef.current, {
      x: `${translateXPixels}px`,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [activeSection, sections.length]);

  const handleSectionClick = (sectionId: string) => {
    if (sectionId !== activeSection) {
      onSectionChange(sectionId);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div ref={sliderRef} className={styles.slider}>
        <div ref={indicatorRef} className={styles.indicator} />
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.section} ${
              activeSection === section.id ? styles.active : ""
            }`}
            onClick={() => handleSectionClick(section.id)}
          >
            <span className={styles.label}>{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
