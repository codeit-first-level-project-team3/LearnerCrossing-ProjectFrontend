import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./IconTextButton.module.css";

export default function IconTextButton({
  text = "버튼",
  icon,
  iconAlt = "icon",
  ...props
}) {
  return (
    <Button className={styles.iconTextBtn} {...props}>
      {icon && <img src={icon} alt={iconAlt} className={styles.icon} />}
      {text}
    </Button>
  );
}
