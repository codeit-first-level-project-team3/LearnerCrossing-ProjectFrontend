import { useEffect } from "react";
import TextButton from "../../molecules/TextButton/TextButton.jsx";
import styles from "./Modal.module.css";

function Modal({className='', isOpen = false, onClick, buttontext, children}) {
  // modal창 뜰 때 스크롤 막기
  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // 사이드이펙트 정리
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  
  if(!isOpen) return null;

  return (
    <div className={className||styles.modalBackground}>
      <div className={styles.modal}>
        {children}
        <TextButton text={buttontext} onClick={onClick} />
      </div>
    </div>
  );
}

export default Modal;
