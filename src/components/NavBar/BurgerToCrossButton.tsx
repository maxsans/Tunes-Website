import React from "react";
import styles from "./BurgerToCrossButton.module.scss";

type Props = {
  opened: boolean;
  onClick?: () => void;
  className?: string;
  size?: number;
};

const BurgerToCrossButton: React.FC<Props> = ({
  opened,
  onClick,
  className,
  size = 40,
}) => {
  return (
    <button
      className={`${styles.burgerBtn} ${opened ? styles.opened : ""} ${
        className || ""
      }`}
      onClick={onClick}
      aria-label={opened ? "Fermer le menu" : "Ouvrir le menu"}
      style={{ width: size, height: size }}
      type="button"
    >
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </button>
  );
};

export default BurgerToCrossButton;