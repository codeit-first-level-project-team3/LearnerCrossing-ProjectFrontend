import { useState} from 'react';
import useStudy from '../../../contexts/StudyStorage.jsx';

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
import FadeToast from '../../molecules/FadeToast/FadeToast.jsx';

/* 타이머 인풋 / 카운트 / 버튼 모두 합친 조직 컴포넌트 */
export default function FocusTimer(){    
    /* 타이머 기능 */
    const [timeInput, setTimeInput] = useState(0);
    const [timerInterval, setTimerInterval] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRun, setIsRun] = useState(false);
    const [isPause, setIsPause] = useState(false);

    /* 포인트 기능 */
    const { plusPoint } = useStudy();
    const [isClear, setIsClear] = useState(false);
    const [gettingPoint, setGettingPoint] = useState(0);

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

    const pointGet = () => {
        if(timeLeft < 0 && isRun) { // 집중에 성공하면 포인트 추가
            const mins = (timerInterval / (1000 * 60)) % 60 //분 단위 크기로 측정 (초 단위도 소수점으로 영향을 줍니다.)
            const bonus = mins > 10 ? Math.sqrt(mins-10) * 3.5 : 0; //10분 이상 집중하면 지수적으로 증가하는 보너스 (배율: 3.5)
            const point = Math.floor(mins + bonus);
            if(point > 0){plusPoint(point);} //분 단위 집중과 보너스 합계를 포인트로 환산.      
            return point;
        }
        return 0;
    }

    const stopTimer = () => {    
        const point = pointGet();
        setGettingPoint(point);
        setTimerInterval(0);  
        setIsRun(false);
        setIsClear(true);
        setTimeout(()=>{
            setIsClear(false);
        }, 2000);
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
            {isPause && <FadeToast 
                type="warning"
                text="집중이 중단되었습니다!"
            />}
            {isClear && <FadeToast 
                type="point"
                text={gettingPoint < 1 ? "집중 완료! (1분 미만 포인트: 0)" : gettingPoint +"포인트를 획득했습니다!"} 
            />}
        </>
    )
}