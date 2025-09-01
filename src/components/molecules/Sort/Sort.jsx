import React, { useState } from "react";
import styles from "./Sort.module.css";
import arrowIcon from "../../../assets/arrowDown.svg"; 

export default function Sort({ label = "최근 순", onChange }) {
  const options = ["최근 순", "오래된 순", "많은 포인트 순", "적은 포인트 순"];
  const [selected, setSelected] = useState(label);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  return (
    <div className={styles.sortWrapper}>
      <div className={styles.sortBox} onClick={() => setOpen(!open)}>
        <span>{selected}</span>
        <img src={arrowIcon} alt="arrow icon" className={styles.sortIcon} />
      </div>
      {open && (
        <div className={styles.sortOptions}>
          {options.map((option, idx) => (
            <div
              key={idx}
              className={`${styles.sortOption} ${idx === 0 ? styles.first : ""} ${
                idx === options.length - 1 ? styles.last : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}