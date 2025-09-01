import styles from "./LabeledTextareaInput.module.css";
import Label from "../../atoms/Label";

export default function LabeledTextareaInput({ labelText, name, errorId, errorMessage, placeholder, id, ...props }) {
  const textareaId = id || name; 

  return (
    <div>
      <div className={styles.label}>
        <Label
          labelId={textareaId} 
          labelName={labelText}
        />
      </div>
      <textarea
        id={textareaId}           
        name={name}
        placeholder={placeholder}
        className={`${styles.textarea} ${errorMessage ? styles.errorTextarea : ""}`} 
        {...props}
      />
      <div id={errorId} className={styles.errorMessage}>{errorMessage}</div>
    </div>
  );
}
