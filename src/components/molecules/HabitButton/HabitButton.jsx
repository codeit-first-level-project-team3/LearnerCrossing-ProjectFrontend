import React from "react";
import styles from "./HabitButton.module.css";

export default function HabitButton({ text = "오늘의 습관으로 가기", ...props }) {
  return (
    <button className={styles.habitBtn} {...props}>
      {text}
    </button>
  );
}
