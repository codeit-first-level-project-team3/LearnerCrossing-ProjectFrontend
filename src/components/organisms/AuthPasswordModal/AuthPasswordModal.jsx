import LabeledPasswordInput from "../../molecules/LabeledPasswordInput/LabeledPasswordInput";
import OneButtonModal from "../../molecules/OneButtonModal";
import styles from "./AuthPasswordModal.module.css";

function AuthPasswordModal({
  isOpen,
  onClick,
  onClose,
  buttonText,
  disabled,
  title,
  value,
  onChange,
}) {
  return (
    <OneButtonModal isOpen={isOpen} onClick={onClick} buttonText={buttonText} disabled={disabled}>
      <div className={styles.authModal}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.content}>권한이 필요해요!</p>
        <LabeledPasswordInput
          labelText="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          value={value}
          onChange={onChange}
        />
        <span className={styles.exit} onClick={onClose}>
          나가기
        </span>
      </div>
    </OneButtonModal>
  );
}

export default AuthPasswordModal;
