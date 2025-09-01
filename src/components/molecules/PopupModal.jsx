import Modal from "../atoms/modal/modal";

function PopupModal({ isOpen, text = "팝업 관련메세지", onClose }) {
  const styles = {
    color: "var(--black-414141)",
    font: "var(--font-18-medium)",
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "56px",
  };

  return (
    <Modal buttontext="확인" isOpen={isOpen} onClick={onClose}>
      <span style={styles}>{text}</span>
    </Modal>
  );
}

export default PopupModal;
