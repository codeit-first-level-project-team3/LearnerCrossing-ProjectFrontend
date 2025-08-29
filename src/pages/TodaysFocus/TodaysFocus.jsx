import { useState } from 'react';

import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';
import SetTimerInput from '../../components/molecules/SetTimerInput/SetTimerInput.jsx';
import CntdownTimer from '../../components/molecules/CntDownTimer/CntDownTimer.jsx';
import Tag from '../../components/atoms/Tag/Tag.jsx';

import styles from './TodaysFocus.module.css';

import pointIcon from '../../assets/point_icon.svg';




function MyTimer(){

    const [targetTime, setTargetTime] = useState(0);
    const [timeInterval, setTimeInterval] = useState(0);
    const [isRun, setIsRun] = useState(false);

    //const fiveMinutesLater = new Date().getTime() + 20 * 1000;

    const startTimer = () => {
        if(timeInterval > 0){
            setIsRun(true)
            setTargetTime(new Date().getTime() + timeInterval + 900);
            //설정 시간에 여유시간 0.9초(900밀리초) 추가 (UX 고려)
        }
    }

    const resetTimer = () => {
        setTargetTime(0);
        setIsRun(false)
    }

    return(
        //임시 버튼을 달았습니다 (추후 수정 예정)
        <div className={styles.wrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 집중</p>
            </div>
            {isRun || 
                <>
                    <SetTimerInput setTimeInterval={setTimeInterval}/>
                    <button onClick={startTimer}>시작 버튼(임시)</button>
                </>
            }
            {isRun && 
                <>
                    <CntdownTimer targetTime={targetTime}/>
                    <button onClick={resetTimer}>리셋 버튼(임시)</button>
                </>
            }
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
                <MyTimer/>
            </StudyMain>
        </main>
        </>
    );
}

export default TodaysFocus;