import { useEffect } from "react";
import styles from './StudyMain.module.css'

// 무려 승인을 받은 공식 틀이 되었습니다.
// 내용 표시 기능은 StudyDescription으로 이주했습니다.
function StudyMain({ children }) {
  useEffect(() => {
    // StudyMain이 마운트될 때 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.studyMain}>
      {children}
    </div>
  );
}

export default StudyMain;
