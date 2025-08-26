import React, { useState } from "react";
import styles from "./Sort.module.css";
import arrowIcon from "../../../assets/arrowDown.svg"; // 상대경로 기준

export default function Sort({ label = "최근 순" }) {
  const options = ["최근 순", "오래된 순", "많은 포인트 순", "적은 포인트 순"];
  const [selected, setSelected] = useState(label);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.sortWrapper}>
      {/* 버튼 */}
      <div className={styles.sortBox} onClick={() => setOpen(!open)}>
        <span>{selected}</span>
        <img src={arrowIcon} alt="arrow icon" className={styles.sortIcon} />
      </div>

      {/* 드롭다운 옵션 */}
      {open && (
        <div className={styles.sortOptions}>
          {options.map((option, idx) => (
            <div
              key={idx}
              className={`${styles.sortOption} ${idx === 0 ? styles.first : ""} ${idx === options.length - 1 ? styles.last : ""}`}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
