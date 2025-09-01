import Modal from "../../atoms/modal/modal";
import LabeledPasswordInput from "../LabeledPasswordInput/LabeledPasswordInput";
import styles from "./AuthPasswordModal.module.css";

function AuthPasswordModal({ isOpen, onClose, title, value, onChange }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} buttontext="수정하러 가기">
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
        <span className={styles.exit} onClick={onClose}>나가기</span>
      </div>
    </Modal>
  );
}

export default AuthPasswordModal;
