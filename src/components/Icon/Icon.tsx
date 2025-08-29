import React from "react";
import { icons } from "../../constants/icons";
import styles from "./Icon.module.scss";

type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color,
  className = "",
  style,
  ...rest
}) => {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return (
    <span className={`${styles.icon} ${className}`} style={style} {...rest}>
      <IconComponent size={size} color={color} />
    </span>
  );
};

export default Icon;