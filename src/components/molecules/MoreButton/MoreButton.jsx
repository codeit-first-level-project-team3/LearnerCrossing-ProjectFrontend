import React from "react";
import styles from "./MoreButton.module.css";

export default function MoreButton({ text = "더보기", ...props }) {
  return (
    <button className={styles.moreBtn} {...props}>
      {text}
    </button>
  );
}
