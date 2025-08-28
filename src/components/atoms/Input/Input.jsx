import { useState } from "react";
import styles from "./Input.module.css";

// 아이콘 import (경로는 프로젝트 구조에 맞춰주세요)
import EyeOpen from "../../../assets/eyeOpen.svg";
import EyeClose from "../../../assets/eyeClose.svg";

export default function Input({ type = "text", placeholder, showToggle = false, ...props }) {
  const [visible, setVisible] = useState(false);

  const inputType =
    type === "password" && showToggle ? (visible ? "text" : "password") : type;

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputInner}>
        <input
          type={inputType}
          placeholder={placeholder}
          {...props}
          className={styles.customInput}
        />
        {type === "password" && showToggle && (
          <img
            src={visible ? EyeOpen : EyeClose}
            alt={visible ? "비밀번호 보이기" : "비밀번호 숨기기"}
            className={styles.eyeIcon}
            onClick={() => setVisible(!visible)}
          />
        )}
      </div>
    </div>
  );
}
