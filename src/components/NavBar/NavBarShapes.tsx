import React from "react";
import styles from "./NavBarShapes.module.scss";

type Props = {
  stage: 0 | 1 | 2;
  mode?: "desktop" | "mobile";
};

const SHAPES_DESKTOP = [
  {
    left: { left: 5, top: 23, rotate: -90 },
    right: { right: 5, bottom: 23, rotate: -90 },
  },
  {
    left: { left: -4, top: -4, rotate: 0 },
    right: { right: -4, bottom: -4, rotate: 0 },
  },
  {
    left: { left: -4, top: -4, rotate: 0 },
    right: { right: -4, bottom: -4, rotate: 0 },
  },
];
const SHAPES_MOBILE = [
  {
    left: { left: 2, top: 16, rotate: -90 },
    right: { right: 2, bottom: 16, rotate: -90 },
  },
  {
    left: { left: -6, top: -8, rotate: 0 },
    right: { right: -6, bottom: -8, rotate: 0 },
  },
  {
    left: { left: -6, top: -8, rotate: 0 },
    right: { right: -6, bottom: -8, rotate: 0 },
  },
];
const SVG_WIDTH = 40;
const SVG_HEIGHT = 60;
const SCALE_MOBILE = 60 / 70;

const NavBarShapes: React.FC<Props> = ({ stage, mode = "desktop" }) => {
  const SHAPES = mode === "mobile" ? SHAPES_MOBILE : SHAPES_DESKTOP;
  const leftProps = SHAPES[stage].left;
  const rightProps = SHAPES[stage].right;
  const scale = mode === "mobile" ? SCALE_MOBILE : 1;

  return (
    <div className={styles.content}>
      <svg
        className={styles.left}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        style={{
          position: "absolute",
          ...leftProps,
          transform: `scale(${scale}) rotate(${leftProps.rotate}deg)`,
          transition: "all 0.6s cubic-bezier(.77,0,.18,1)",
        }}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="M0 13C0 5.97 5.97 0 13 0H36.66V30H0V13Z" fill="#B6D8F2" />
          <rect x="34" width="6" height="5" rx="2.5" fill="#B6D8F2" />
          <rect y="28" width="5" height="6" rx="2.5" fill="#B6D8F2" />
        </g>
      </svg>
      <svg
        className={styles.right}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        style={{
          position: "absolute",
          ...rightProps,
          transform: `scale(${scale}) rotate(${rightProps.rotate}deg)`,
          transition: "all 0.6s cubic-bezier(.77,0,.18,1)",
        }}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M40 47C40 54.03 34.03 60 27 60H3.34V30H40V47Z"
            fill="#F7F6CF"
          />
          <rect x="0" y="55" width="6" height="5" rx="2.5" fill="#F7F6CF" />
          <rect x="35" y="28" width="5" height="6" rx="2.5" fill="#F7F6CF" />
        </g>
      </svg>
    </div>
  );
};

export default NavBarShapes;
