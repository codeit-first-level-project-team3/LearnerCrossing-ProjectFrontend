import styles from "./Logo.module.css";       // CSS 모듈 import
import logo from "../../../assets/Logo.svg";  // src/components/atoms/Logo/에서 계산한 상대경로

export default function Logo() {
  return (
    <img
      src={logo}            
      alt="로고"
      className={styles.logo} // CSS 모듈 적용
    />
  );
}
