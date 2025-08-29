import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./ShadowIconButton.module.css";

export default function ShadowIconButton({
  icon,
  iconAlt = "icon",
  swap = true,
  ...props
}) {
  return (
    <Button
      className={`${styles.shadowIconBtn} ${swap ? styles.swap : ""}`}
      {...props}
    >
      <div className={styles.shadowLayer}></div>
      {icon && <img src={icon} alt={iconAlt} className={styles.icon} />}
    </Button>
  );
}
