import { useState, useEffect } from 'react';
import Tag from '../atoms/Tag/Tag';


//이게 서버 시간을 받아와야 하는지 고민입니다 (+ 습관 클리어 시간 판정)
export default function DateTag(){

    const [date, setDate] = useState(formatKoreanDate(new Date()));

    useEffect(() => {
        //setInterval(callback, 밀리초) : JS에서 밀리초마다 반복하는 함수.
        //반환 값은 함수의 고유한 ID => clearInterval()로 멈추기 위한 ID.
        const timer = setInterval(() => {
            setDate(formatKoreanDate(new Date()));
        }, 1000 * 20); //분까지만 표시하기 때문에 20초마다 업데이트 하도록 했습니다.

        //ureEffect의 리턴은 "정리 함수" 이므로 clearInterval을 넣기 적합하다!!
        return () => clearInterval(timer);  
      }, []);

    return (
        <Tag text={date}/>
    )
}

function formatKoreanDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  hours = hours % 12 || 12; // 0시는 12시로 표시

  const formatted = `${year}-${month}-${day} ${period} ${String(hours).padStart(2, "0")}:${minutes}`;
  return formatted;
}