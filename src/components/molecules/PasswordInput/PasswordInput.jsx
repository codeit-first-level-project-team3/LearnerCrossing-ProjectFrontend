import { useState } from "react";
import Input from "../../atoms/Input/Input"; 
import EyeOpen from "../../../assets/eyeOpen.svg";
import EyeClose from "../../../assets/eyeClose.svg";
import styles from "./PasswordInput.module.css";

export default function PasswordInput({ placeholder, ...props }) {
  const [visible, setVisible] = useState(false);
  const type = visible ? "text" : "password";

  return (
    <div className={styles.wrapper}>
      <Input type={type} placeholder={placeholder} {...props} />
      <img
        src={visible ? EyeOpen : EyeClose}
        alt="토글 비밀번호"
        className={styles.eyeIcon}
        onClick={() => setVisible(!visible)}
      />
    </div>
  );
}