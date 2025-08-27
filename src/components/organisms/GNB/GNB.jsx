import Logo from "../../atoms/Logo/Logo";
import StudyCreateButton from "../../molecules/StudyCreateButton/StudyCreateButton"; 
import styles from "./GNB.module.css"; // CSS 모듈 import

export default function GNB({ showCreateStudy = false }) {
  return (
    <header className={styles.gnb}>
      <Logo />
      {showCreateStudy && <StudyCreateButton />}
    </header>
  );
}
