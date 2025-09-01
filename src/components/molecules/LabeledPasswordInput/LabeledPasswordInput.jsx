import { useState } from "react";
import LabeledInput from "../LabeledInput/LabeledInput"; 
import EyeOpen from "../../../assets/eyeOpen.svg";
import EyeClose from "../../../assets/eyeClose.svg";
import styles from "./LabeledPasswordInput.module.css";
import Label from "../../atoms/Label";

export default function LabeledPasswordInput({ labelText, name, errorId, errorMessage, placeholder, id, autoComplete = "new-password", ...props }) {
  const [visible, setVisible] = useState(false);
  const type = visible ? "text" : "password";
  const inputId = id || name;

  return (
    <div>
      <div className={styles.label}>
        <Label
          labelId={inputId} 
          labelName={labelText}
        />
      </div>
      <div className={styles.wrapper}>
        <LabeledInput
          id={inputId}          
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete} 
          errorMessage={errorMessage} 
          {...props}
        />
        <img
          src={visible ? EyeOpen : EyeClose}
          alt="토글 비밀번호"
          className={styles.eyeIcon}
          onClick={() => setVisible(!visible)}
        />
      </div>
      <div id={errorId} className={styles.errorMessage}>{errorMessage}</div>
    </div>
  );
}
