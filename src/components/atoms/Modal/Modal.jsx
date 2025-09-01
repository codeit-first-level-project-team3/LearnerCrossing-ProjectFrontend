import { useEffect } from "react";
import styles from "./Modal.module.css";

function Modal({isOpen = false, children}) {
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
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
