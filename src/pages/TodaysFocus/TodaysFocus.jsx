import { useState } from 'react';

import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';
import SetTimerInput from '../../components/molecules/SetTimerInput/SetTimerInput.jsx';
import CntdownTimer from '../../components/molecules/CntDownTimer/CntDownTimer.jsx';
import Tag from '../../components/atoms/Tag/Tag.jsx';

import styles from './TodaysFocus.module.css';

import pointIcon from '../../assets/point_icon.svg';




function Focus(){

    const [targetTime, setTargetTime] = useState(0);

    //const fiveMinutesLater = new Date().getTime() + 20 * 1000;

    return(
        <div className={styles.wrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 집중</p>
            </div>
            <SetTimerInput setTargetTime={setTargetTime}/>
            <CntdownTimer targetTime={targetTime}/>
        </div>
    )
}

function TodaysFocus(){
    const goToBtn = [
        {to: '/habits', name:'오늘의 습관'},
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
            <StudyMain>
                <StudyDescription
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