import { useState } from 'react';

import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';
import SetTimerInput from '../../components/molecules/SetTimerInput/SetTimerInput.jsx';
import CntdownTimer from '../../components/molecules/CntDownTimer/CntDownTimer.jsx';
import Tag from '../../components/atoms/Tag/Tag.jsx';
import BumpButton from '../../components/molecules/BumpButton/BumpButton.jsx';

import styles from './TodaysFocus.module.css';

import pointIcon from '../../assets/point_icon.svg';
import startIcon from '../../assets/start.svg';
import stopIcon from '../../assets/stop.svg';
import restartIcon from '../../assets/restart.svg';
import pauseIcon from '../../assets/pause.svg';




function MyTimer(){    
    const [timeInput, setTimeInput] = useState(0);
    const [timerInterval, setTimerInterval] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRun, setIsRun] = useState(false);
    const [isPause, setIsPause] = useState(false);

    //const fiveMinutesLater = new Date().getTime() + 20 * 1000;

    const startTimer = () => {
        if(timeInput > 0){
            setTimerInterval(timeInput + 900);
            setIsRun(true);
            //설정 시간에 여유시간 0.9초(900밀리초) 추가 (UX 고려)
        }
    }

    const stopTimer = () => {
        setTimerInterval(0);
        setIsRun(false)
    }

    const pauseTimer = () => {
        if(!isPause){setIsPause(true);}
    }
    
    const restartTimer = () => {
        if(isPause){setIsPause(false);}
    }

    return(
        <div className={styles.box}>
        <div className={styles.wrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 집중</p>
            </div>
            {isRun || 
                <div className={styles.timerDiv}>
                    <SetTimerInput setTimeInterval={setTimeInput}/>
                    <div className={styles.btnDiv}>
                        <BumpButton 
                            alt='start'
                            icon={startIcon}
                            text='Start!'
                            shapeCircle={false}
                            onClick={startTimer}
                        />
                    </div>
                </div>
            }
            {isRun && 
                <div className={styles.timerDiv}>
                    <CntdownTimer 
                        interval={timerInterval}
                        isPause={isPause}
                        _setTimeLeft={setTimeLeft}
                    />
                    {timeLeft > 0 && <div className={styles.btnDiv}>
                        <BumpButton 
                            alt='pause'
                            icon={pauseIcon}
                            shapeCircle={true}
                            colorSwap={true}
                            onClick={pauseTimer}
                        />
                        <BumpButton 
                            alt='start'
                            icon={startIcon}
                            text='Start!'
                            shapeCircle={false}
                            disabled={true}
                        />
                        <BumpButton 
                            alt='restart'
                            icon={restartIcon}
                            shapeCircle={true}
                            onClick={restartTimer}
                        />
                    </div>}
                    {timeLeft <= 0 && <div className={styles.btnDiv}>
                        <BumpButton 
                            alt='stop'
                            icon={stopIcon}
                            text='Stop!'
                            shapeCircle={false}
                            onClick={stopTimer}
                        />
                    </div>}
                </div>
            }
        </div>
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