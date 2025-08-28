import React from "react";
import Button from "../../atoms/Button/Button"; 
import styles from "./MoreButton.module.css";

export default function MoreButton({ text = "더보기", ...props }) {
  return (
    <Button className={styles.moreBtn} {...props}>
      {text}
    </Button>
  );
}
