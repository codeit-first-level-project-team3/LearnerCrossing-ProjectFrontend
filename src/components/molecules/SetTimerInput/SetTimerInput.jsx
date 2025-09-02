import { useEffect, useState } from "react"
import styles from './SetTimerInput.module.css';

export default function SetTimerInput({setTimeInterval}){
    const [mins, setMins] = useState('');
    const [secs, setSecs] = useState('');

    useEffect(()=>{
        const timeInterval =  ((covertToValidInput(mins) * 60) + covertToValidInput(secs)) * 1000;
        setTimeInterval(timeInterval);
    }, [mins, secs]);

    //String을 분, 초에 Int로 저장하는 함수
    const setStringTime = (numString, setterFunc) => {
        setterFunc(String(covertToValidInput(numString)).padStart(2, '0'));
    }

    const covertToValidInput = (numString) => {
        return Number.isInteger(parseInt(numString)) 
            ? clamp(parseInt(numString), 0, 59) //0~60 사이 숫자로 자동 조정
            : 0
    }

    return (
        <div className={styles.segment}>
            <input 
                className={styles.digit} 
                type="number" 
                value={mins} 
                onChange={(e)=>setStringTime(e.target.value, setMins)}
                onFocus={()=>setMins('')}
                placeholder="00"
                size={2}
            />
            <div className={styles.colon}><p>:</p></div>
            <input 
                className={styles.digit} 
                type="number" 
                value={secs} 
                onChange={(e)=>setStringTime(e.target.value, setSecs)}
                onFocus={()=>setSecs('')}
                placeholder="00"
                size={2}
            />
        </div>
    )
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
