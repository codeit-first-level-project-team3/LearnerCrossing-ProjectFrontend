import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import CntdownTimer from '../../components/molecules/CntDownTimer/CntDownTimer.jsx';
import Tag from '../../components/atoms/Tag/Tag.jsx';

import styles from './Concentrations.module.css';

import pointIcon from '../../assets/point_icon.svg';



function Concentration(){
    const fiveMinutesLater = new Date().getTime() + 20 * 1000;

    return(
        <div className={styles.wrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 집중</p>
            </div>
            <CntdownTimer targetTime={fiveMinutesLater}/>
        </div>
    )
}

function TodaysConcentration(){
    const goToBtn = [
        {to: '/routines', name:'오늘의 습관'},
        {to: '/', name:'홈'},
    ]

    const info = {
        name: '현재까지 획득한 포인트',
        value: <Tag img={pointIcon} value='340p'/>
    }

    return (
        <>
        <GNB/>
        <main>
            {/* StudyMain -> StudyDescription으로 변경하면서 일단은 지웠습니다! */}
        </main>
        </>
    );
}

export default TodaysConcentration;