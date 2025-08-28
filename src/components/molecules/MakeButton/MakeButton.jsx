import React from "react";
import Button from '../../atoms/Button/Button'; 
import styles from "./MakeButton.module.css";

export default function MakeButton({ text = "만들기", ...props }) {
  return (
    <Button className={styles.makeBtn} {...props}>
      {text}
    </Button>
  );
}
