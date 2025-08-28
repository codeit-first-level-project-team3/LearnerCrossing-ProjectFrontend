import styles from './StudyMain.module.css'

function StudyMain({children}){
    return(
        <div className={styles.studyMain}>
            {children}
        </div>
    );
}

export default StudyMain;