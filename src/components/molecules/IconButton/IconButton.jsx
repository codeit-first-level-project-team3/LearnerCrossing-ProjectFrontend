import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./IconButton.module.css";

export default function IconButton({
  icon,
  iconAlt = "icon",
  ...props
}) {
  return (
    <Button className={styles.iconBtn} {...props}>
      {icon && <img src={icon} alt={iconAlt} className={styles.icon} />}
    </Button>
  );
}
