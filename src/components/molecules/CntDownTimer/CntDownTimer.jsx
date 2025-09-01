import { useState, useEffect } from 'react';
import styles from './CntDownTimer.module.css';

function CntdownTimer({ interval=0, isPause=false, _setTimeLeft }) {
  const [timeLeft, setTimeLeft] = useState(interval);
  
  const covertToTimerOutput = (diff) => {
    const abs = Math.abs(diff > 0 ? diff : diff - 1000);
    
    /*
    abs, floor의 특징 때문에 0초대에 2초 가량 머무르는 현상이 발생. (09xx ~ -0.9xx까지 를 0으로 표시 하므로)
    마이너스로 내려가면 ceil을 적용하고 -1 로 해결
    */
    const secfloor = (time) => {
      return diff > 0 ? Math.floor(time) : Math.ceil(time) - 1;
    }

    return {
      sign: Math.floor(diff/1000) > -1 ? '': '-',
      hours: Math.floor((abs / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((abs / (1000 * 60)) % 60),
      seconds: secfloor((abs / 1000) % 60),
    };
  };

  const [outForm, setOutForm] = useState(covertToTimerOutput(timeLeft));

  const makeTimer = () => {
    const targetTime = new Date().getTime() + timeLeft; //남은 시간을 통해 새로운 타겟 타임 설정.
    return setInterval(() => { //화살표 함수는 선언 스코프를 따르기 때문에 한번만 targetTime을 설정해주면 계속 작동.
      const diff = targetTime - new Date().getTime();
      setTimeLeft(diff);
      _setTimeLeft(diff);
      setOutForm(covertToTimerOutput(diff));
    }, 500);
  }

  useEffect(() => {
    setTimeLeft(interval);
    _setTimeLeft(interval);
  }, [interval]);

  useEffect(() => {
    let timer = null;
    if(isPause){clearInterval(timer);} //Pause 상태면 Interval 함수 제거
    else{timer = makeTimer();} //작동 시 Interval 함수 생성.

    /* ureEffect의 "정리 함수"에도 clearInterval을 넣어서 반드시 Interval 함수 제거. */
    return () => clearInterval(timer);
  }, [isPause]);

  /* 남은 시간에 따른 스타일 조정 */
  const style = Math.floor(timeLeft/1000) > 0 
    ? Math.floor(timeLeft/1000) > 10 ? {color: "var(--black-414141)"} : {color: "var(--red-F50E0E)"}
    : {color: "var(--gray-818181)"};

  return (
    <div className={styles.segment} style={style}>
        <div className={styles.sign}><p>{outForm.sign}</p></div>
        <div className={styles.digit}><p>{String(outForm.minutes).padStart(2, '0')}</p></div>
        <div className={styles.colon}><p>:</p></div>
        <div className={styles.digit}><p>{String(outForm.seconds).padStart(2, '0')}</p></div>
    </div>
  );
}

export default CntdownTimer;
