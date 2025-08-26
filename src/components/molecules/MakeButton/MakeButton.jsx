import React from "react";
import styles from "./MakeButton.module.css";

export default function MakeButton({ text = "만들기", ...props }) {
  return (
    <button className={styles.makeBtn} {...props}>
      {text}
    </button>
  );
}
