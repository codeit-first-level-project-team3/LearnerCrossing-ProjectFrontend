import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';
import FocusTimer from '../../components/organisms/FocusTimer/FocusTimer.jsx';

import styles from './TodaysFocus.module.css';

function Focus(){
    return (
        <div className={styles.box}>
            <div className={styles.wrapper}>
                <div className={styles.titleDiv}>
                    <p className={styles.title}>오늘의 집중</p>
                </div>
                <FocusTimer/>
            </div>
        </div>
    )
}

function TodaysFocus(){

    const goToBtn = [
        {to: '/habits', name:'오늘의 습관'},
        {to: '/studyDetail', name:'홈'},
    ]

    return (
        <>
        <GNB/>
        <main>
            <StudyMain>
                <StudyDescription
                    title='연우의 개발 공장'
                    goToBtn={goToBtn}
                    isInfoPoint={true}
                />
                <Focus/>
            </StudyMain>
        </main>
        </>
    );
}

export default TodaysFocus;