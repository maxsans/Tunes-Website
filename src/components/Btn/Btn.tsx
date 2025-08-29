import React from "react";
import styles from "./Btn.module.scss";
import Icon from "../Icon/Icon";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "surface";
  icon?: string;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children: React.ReactNode;
};

const Btn: React.FC<BtnProps> = ({
  variant = "primary",
  icon,
  iconPosition = "left",
  loading = false,
  children,
  className = "",
  disabled,
  ...rest
}) => {
  const classes = [
    styles.btn,
    styles[variant],
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      <span className={styles.label}>
        {icon && iconPosition === "left" && (
          <Icon name={icon as any} className={styles.logo} />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <Icon name={icon as any} className={styles.logo} />
        )}
        {loading && (
          <span className={styles.spinner} aria-hidden>
            {}
          </span>
        )}
      </span>
    </button>
  );
};

export default Btn;
