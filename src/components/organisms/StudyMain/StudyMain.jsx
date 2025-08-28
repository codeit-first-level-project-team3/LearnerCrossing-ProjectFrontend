import styles from './StudyMain.module.css'

//session 대신에 임시로 쓰고 있습니다;; (죄송합니다.)
//css에 반응형 디자인도 되어 있습니다!(<퍽)
function StudyMain({children}){

    return(
        <div className={styles.studyMain}>
            {children}
        </div>
    );
}

export default StudyMain;