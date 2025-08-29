import React from "react";
import styles from "./HomeBackground.module.scss";

type Props = {
  isMobile: boolean;
};

const HomeBackground: React.FC<Props> = ({ isMobile }) => {
  if (isMobile) {
    return (
      <svg
        className={styles.content}
        style={{
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
        viewBox="0 0 667 6954"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <g clipPath="url(#clip0_93_1394)">
          <rect width="667" height="6954" fill="#F7F7F8" />
          <rect
            width="667"
            height="5975"
            transform="translate(-5 979)"
            fill="url(#paint0_radial_93_1394)"
          />
          <rect
            width="667"
            height="5975"
            transform="translate(-5 979)"
            fill="url(#paint1_radial_93_1394)"
          />
          <rect
            width="667"
            height="5975"
            transform="translate(-5 979)"
            fill="url(#paint2_radial_93_1394)"
          />
          <rect
            width="667"
            height="3081"
            transform="translate(-3)"
            fill="url(#paint3_radial_93_1394)"
          />
          <rect
            width="667"
            height="3081"
            transform="translate(-3)"
            fill="url(#paint4_radial_93_1394)"
          />
          <rect
            width="667"
            height="3081"
            transform="translate(-3)"
            fill="url(#paint5_radial_93_1394)"
          />
        </g>
        <defs>
          <radialGradient
            id="paint0_radial_93_1394"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(456.478 6122) rotate(-111.799) scale(1806.15 1984.77)"
          >
            <stop stopColor="#9AC8EB" />
            <stop offset="1" stopColor="#9AC8EB" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint1_radial_93_1394"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(-9.30866e-05 2282.5) rotate(-28.1184) scale(1161.69 1936.52)"
          >
            <stop stopColor="#9AC8EB" />
            <stop offset="1" stopColor="#9AC8EB" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_93_1394"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(837.919 3416) rotate(130.277) scale(2063.11 891.588)"
          >
            <stop stopColor="#F7F6CF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F7F6CF" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_93_1394"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(61.1417 1030) rotate(-57.2474) scale(775.254 816.12)"
          >
            <stop stopColor="#F7F6CF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F7F6CF" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint4_radial_93_1394"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(582.236 213.5) rotate(114.538) scale(725.525 793.175)"
          >
            <stop stopColor="#9AC8EB" />
            <stop offset="1" stopColor="#9AC8EB" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="paint5_radial_93_1394"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(667 1696) rotate(-122.13) scale(716.777 909.928)"
          >
            <stop stopColor="#F7F6CF" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F7F6CF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="clip0_93_1394">
            <rect width="667" height="6954" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className={styles.content}
      style={{
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 6954"
      fill="none"
      preserveAspectRatio="none"
    >
      <g clipPath="url(#clip0_5_59)">
        <rect width="1440" height="6954" fill="#F7F7F8" />
        <rect
          width="1440"
          height="5975"
          transform="translate(-5 979)"
          fill="url(#paint0_radial_5_59)"
        />
        <rect
          width="1440"
          height="5975"
          transform="translate(-5 979)"
          fill="url(#paint1_radial_5_59)"
        />
        <rect
          width="1440"
          height="5975"
          transform="translate(-5 979)"
          fill="url(#paint2_radial_5_59)"
        />
        <rect width="1440" height="3081" fill="url(#paint3_radial_5_59)" />
        <rect width="1440" height="3081" fill="url(#paint4_radial_5_59)" />
        <rect width="1440" height="3081" fill="url(#paint5_radial_5_59)" />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_5_59"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(985.5 6122) rotate(-130.809) scale(2215.63 3493.04)"
        >
          <stop stopColor="#9AC8EB" />
          <stop offset="1" stopColor="#9AC8EB" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_5_59"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-0.000200967 2282.5) rotate(-13.9021) scale(2278.75 2131.35)"
        >
          <stop stopColor="#9AC8EB" />
          <stop offset="1" stopColor="#9AC8EB" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_5_59"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1809 3416) rotate(151.338) scale(3281.62 1210.14)"
        >
          <stop stopColor="#F7F6CF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F7F6CF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_5_59"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(132 1030) rotate(-35.7556) scale(1115.81 1224.18)"
        >
          <stop stopColor="#F7F6CF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F7F6CF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_5_59"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1257 213.5) rotate(134.585) scale(926.688 1340.68)"
        >
          <stop stopColor="#9AC8EB" />
          <stop offset="1" stopColor="#9AC8EB" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_5_59"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1440 1696) rotate(-143.59) scale(1022.63 1376.92)"
        >
          <stop stopColor="#F7F6CF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F7F6CF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip0_5_59">
          <rect width="1440" height="6954" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HomeBackground;
