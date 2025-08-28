import styles from "./Logo.module.css";       
import logo from "../../../assets/Logo.svg";  
export default function Logo() {
  return (
    <img
      src={logo}            
      alt="로고"
      className={styles.logo} 
    />
  );
}
