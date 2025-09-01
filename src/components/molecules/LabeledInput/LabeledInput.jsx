import styles from "./LabeledInput.module.css";
import Label from "../../atoms/Label";

export default function LabeledInput({ labelText, name, errorId, errorMessage, type = "text", placeholder, autoComplete, id, ...props }) {
  const inputId = id || name; 

  return (
    <div>
      <div className={styles.label}>
        <Label
          labelId={inputId}   
          labelName={labelText}
        />
      </div>
      <input
        id={inputId}               
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete} 
        className={`${styles.input} ${errorMessage ? styles.errorInput : ""}`} 
        {...props}
      />
      {errorMessage && <div id={errorId} className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
}
