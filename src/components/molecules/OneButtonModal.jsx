import Modal from '../../atoms/Modal/Modal';
import TextButton from "./TextButton/TextButton";

function OneButtonModal({ isOpen, onClick, buttonText, children }) {
  return (
    <Modal isOpen={isOpen}>
      {children}
      <TextButton text={buttonText} onClick={onClick} />
    </Modal>
  );
}

export default OneButtonModal;
