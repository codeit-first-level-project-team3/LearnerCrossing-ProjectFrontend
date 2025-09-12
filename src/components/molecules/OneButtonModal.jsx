import Modal from '../atoms/Modal/Modal';
import TextButton from "./TextButton/TextButton";

function OneButtonModal({ isOpen, onClick, buttonText, disabled, children }) {
  return (
    <Modal isOpen={isOpen}>
      {children}
      <TextButton text={buttonText} onClick={onClick} disabled={disabled} />
    </Modal>
  );
}

export default OneButtonModal;
