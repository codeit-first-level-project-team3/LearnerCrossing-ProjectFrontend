import StudyMain from '../../components/organism/StudyMain/StudyMain.jsx';
import CntdownTimer from '../../components/molecules/CntDownTimer/CntDownTimer.jsx';
import Tag from '../../components/atoms/Tag/Tag.jsx';

import styles from './Routines.module.css';

import pointIcon from '../../assets/point_icon.svg';


function Concentration(){
    const fiveMinutesLater = new Date().getTime() + 20 * 1000;

    return(
        <div className={styles.routineWrapper}>
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
        {/* <header></header> */}
        <main>
            <StudyMain 
                title='연우의 개발 공장'
                goToBtn= {goToBtn}
                description={null}
                info={info}
                mainFeature={<Concentration/>}
            />
        </main>
        </>
    );
}

export default TodaysConcentration;