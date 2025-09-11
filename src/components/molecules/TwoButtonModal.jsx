import Modal from '../../atoms/Modal/Modal';
import TextButton from "./TextButton/TextButton";

function TwoButtonModal({ isOpen, onClose, onClick, buttonText, children }) {
  const buttonBox = {
    display: "flex",
    width: "100%",
    gap: "24px",
  };
  return (
    <Modal isOpen={isOpen}>
      {children}
      <div style={buttonBox}>
        <TextButton text="취소" isGreen={false} onClick={onClose} />
        <TextButton text={buttonText} onClick={onClick} />
      </div>
    </Modal>
  );
}

export default TwoButtonModal;
