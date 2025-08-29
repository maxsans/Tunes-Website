import React from "react";
import styles from "./Logo.module.scss";

type Props = {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  blueShadow?: boolean;
};

const Logo: React.FC<Props> = ({
  size = 70,
  style,
  className,
  blueShadow = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 70 70"
    fill="none"
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    className={`${className ?? ""} ${blueShadow ? styles.blueShadow : ""}`}
  >
    <g clipPath="url(#clip0)">
      <rect
        width="70"
        height="70"
        rx="35"
        transform="matrix(1 0 0 -1 0 70)"
        fill="url(#paint0_linear)"
      />
      <rect
        width="50.4"
        height="50.4"
        rx="25.2"
        transform="matrix(1 0 0 -1 9.8 60.2)"
        fill="#2D1023"
      />
      <rect
        width="27.2222"
        height="27.2222"
        rx="13.6111"
        transform="matrix(1 0 0 -1 9.8 60.2)"
        fill="#F7F6CF"
      />
      <g filter="url(#filter0_d)">
        <rect
          width="16.8"
          height="5.6"
          rx="2.8"
          transform="matrix(1 0 0 -1 21 60.2)"
          fill="#F7F6CF"
        />
      </g>
      <g filter="url(#filter1_d)">
        <rect
          width="5.6"
          height="16.8"
          rx="2.8"
          transform="matrix(1 0 0 -1 9.8 49)"
          fill="#F7F6CF"
        />
      </g>
      <rect
        width="27.2222"
        height="27.2222"
        rx="13.6111"
        transform="matrix(1 0 0 -1 32.9778 37.0222)"
        fill="#B6D8F2"
      />
      <g filter="url(#filter2_d)">
        <rect
          width="16.8"
          height="5.6"
          rx="2.8"
          transform="matrix(1 0 0 -1 32.2 15.4)"
          fill="#B6D8F2"
        />
      </g>
      <g filter="url(#filter3_d)">
        <rect
          width="5.6"
          height="16.8"
          rx="2.8"
          transform="matrix(1 0 0 -1 54.6 37.8)"
          fill="#B6D8F2"
        />
      </g>
      <rect
        width="39.2259"
        height="39.2259"
        rx="19.613"
        transform="matrix(1 0 0 -1 15.387 54.613)"
        fill="url(#paint1_linear)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="1"
        y="14.6"
        width="96.8"
        height="85.6"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="20" />
        <feGaussianBlur stdDeviation="20" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.968627 0 0 0 0 0.964706 0 0 0 0 0.811765 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d"
        x="-30.2"
        y="12.2"
        width="85.6"
        height="96.8"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="20" />
        <feGaussianBlur stdDeviation="20" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.968627 0 0 0 0 0.964706 0 0 0 0 0.811765 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_d"
        x="-27.8"
        y="-30.2"
        width="96.8"
        height="85.6"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-20" />
        <feGaussianBlur stdDeviation="20" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.713726 0 0 0 0 0.847059 0 0 0 0 0.94902 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_d"
        x="14.6"
        y="-39"
        width="85.6"
        height="96.8"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-20" />
        <feGaussianBlur stdDeviation="20" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.713726 0 0 0 0 0.847059 0 0 0 0 0.94902 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="0"
        y1="0"
        x2="74.997"
        y2="64.1589"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9AC8EB" />
        <stop offset="1" stopColor="#5784BA" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="0"
        y1="0"
        x2="39.2259"
        y2="39.2259"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.0107143" stopColor="#9AC8EB" />
        <stop offset="1" stopColor="#5784BA" />
      </linearGradient>
      <clipPath id="clip0">
        <rect width="70" height="70" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Logo;
