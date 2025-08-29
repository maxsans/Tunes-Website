import React from "react";
import styles from "./Box.module.scss";
import Icon from "../Icon/Icon";

interface BoxProps {
  children: React.ReactNode;
  icon?: keyof typeof import("../../constants/icons").icons;
  onClick?: () => void;
  disabled?: boolean;
}

const Box: React.FC<BoxProps> = ({
  children,
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <div
      className={`${styles.box} ${
        onClick && !disabled ? styles.clickable : ""
      } ${disabled ? styles.disabled : ""}`}
      onClick={onClick && !disabled ? onClick : undefined}
    >
      {icon && (
        <div className={styles.iconContainer}>
          <Icon name={icon} style={{ width: "80%", height: "80%" }} />
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Box;
