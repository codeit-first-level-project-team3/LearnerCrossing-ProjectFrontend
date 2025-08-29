import { useState, useEffect } from 'react';
import styles from './CntDownTimer.module.css';

function CntdownTimer({ isRun, targetTime }) {
  const calculateTimeLeft = () => {
    const difference = targetTime - new Date().getTime();
    const abs = Math.abs(difference > 0 ? difference : difference -1000);
    
    //abs, floor의 특징 때문에 0초대에 2초 가량 머무르는 현상이 발생. (09xx ~ -0.9xx까지 를 0으로 표시 하므로)
    //마이너스로 내려가면 ceil을 적용하고 -1 로 해결
    const secfloor = (time) => {
      return difference > 0 ? Math.floor(time) : Math.ceil(time) - 1;
    }

    return {
      sign: Math.floor(difference/1000) > -1 ? '': '-',
      wholeSecs: Math.floor(difference / 1000),
      hours: Math.floor((abs / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((abs / (1000 * 60)) % 60),
      seconds: secfloor((abs / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    //setInterval(callback, 밀리초) : JS에서 밀리초마다 반복하는 함수.
    //반환 값은 함수의 고유한 ID => clearInterval()로 멈추기 위한 ID.
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      if (!updatedTime) clearInterval(timer);
    }, 100);

    //ureEffect의 리턴은 "정리 함수" 이므로 clearInterval을 넣기 적합하다!!
    return () => clearInterval(timer);
  }, [isRun, targetTime]);

  const style = timeLeft.wholeSecs > 0 
    ? timeLeft.wholeSecs > 10 ? {color: "var(--black-414141)"} : {color: "var(--red-F50E0E)"}
    : {color: "var(--gray-818181)"};

  return (
    <div className={styles.segment} style={style}>
        <div className={styles.sign}><p>{timeLeft.sign}</p></div>
        <div className={styles.digit}><p>{String(timeLeft.minutes).padStart(2, '0')}</p></div>
        <div className={styles.colon}><p>:</p></div>
        <div className={styles.digit}><p>{String(timeLeft.seconds).padStart(2, '0')}</p></div>
    </div>
  );
}

export default CntdownTimer;
