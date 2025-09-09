import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import styles from './Loading.module.css';

function LoadingPage(){

    const goToBtn = [
        {to: '../habits', name:'오늘의 습관'},
        {to: '../', name:'홈'},
    ]

    return (
        <>
        <GNB/>
        <main>
            <StudyMain>
                <div className={styles.loadingBox}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>LOADING...</p>
                </div>
            </StudyMain>
        </main>
        </>
    );
}

export default LoadingPage;