import { useState } from 'react';

import CntdownTimer from '../../molecules/CntDownTimer/CntDownTimer.jsx';
import SetTimerInput from '../../molecules/SetTimerInput/SetTimerInput.jsx';
import BumpButton from '../../molecules/BumpButton/BumpButton.jsx';
import Tag from '../../atoms/Tag/Tag.jsx';

import startIcon from '../../../assets/start.svg';
import stopIcon from '../../../assets/stop.svg';
import restartIcon from '../../../assets/restart.svg';
import pauseIcon from '../../../assets/pause.svg';

import styles from './FocusTimer.module.css';

import timerIcon from '../../../assets/ic_timer.svg';

/* 타이머 인풋 / 카운트 / 버튼 모두 합친 조직 컴포넌트 */
export default function FocusTimer(){    

    const [timeInput, setTimeInput] = useState(0);
    const [timerInterval, setTimerInterval] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRun, setIsRun] = useState(false);
    const [isPause, setIsPause] = useState(false);

    /* 타이머 세팅시 나오는 태그용 텍스트 (설정 시간 표시)*/
    const mins = String(Math.floor((timerInterval / (1000 * 60)) % 60)).padStart(2, '0');
    const secs = String(Math.floor((timerInterval / 1000) % 60)).padStart(2, '0');
    const timerTagText = `${mins}:${secs}`;

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
        <>
            {isRun 
            ? ( <div className={styles.timerDiv}>
                    <div className={styles.tagDiv}>
                        <Tag img={timerIcon} text={timerTagText}/>
                    </div>
                    <CntdownTimer 
                        interval={timerInterval}
                        isPause={isPause}
                        _setTimeLeft={setTimeLeft}
                    />
                    <div className={styles.gap}></div>
                    {timeLeft > 0 
                    ?   <div className={styles.btnDiv}>
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
                        </div>
                    :   <div className={styles.btnDiv}>
                            <BumpButton 
                                alt='stop'
                                icon={stopIcon}
                                text='Stop!'
                                shapeCircle={false}
                                onClick={stopTimer}
                            />
                        </div>
                    }
                </div>)
            : ( <div className={styles.timerDiv}>
                    <div className={styles.tagDiv}></div>
                    <SetTimerInput setTimeInterval={setTimeInput}/>
                    <div className={styles.gap}></div>
                    <div className={styles.btnDiv}>
                        <BumpButton 
                            alt='start'
                            icon={startIcon}
                            text='Start!'
                            shapeCircle={false}
                            onClick={startTimer}
                        />
                    </div>
                </div>) 
            }
        </>
    )
}