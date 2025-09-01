import { Link } from "react-router-dom";
import styles from "./Logo.module.css";       
import logo from "../../../assets/Logo.svg";  

export default function Logo() {
  return (
    <Link to="/">
      <img
        src={logo}            
        alt="로고"
        className={styles.logo} 
      />
    </Link>
  );
}
