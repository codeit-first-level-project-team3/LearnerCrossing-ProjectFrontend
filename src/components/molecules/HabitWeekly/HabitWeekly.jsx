import { useState } from "react";
import Sticker from "../../atoms/Sticker";
import style from "./HabitWeekly.module.css";

function HabitWeekly() {
  const weekDays = {
    mon: "월",
    tue: "화",
    wed: "수",
    thu: "목",
    fri: "금",
    sat: "토",
    sun: "일",
  };

  const [sticker, setSticker] = useState({ color: "empty", num: 0 });

  const handleStickerClick = (clickedSticker) => { // 수정필요
    setSticker((prev) => ({
      ...prev, // 기존 num 유지
      color:
        prev.color === clickedSticker.color ? "gray" : clickedSticker.color,
    }));
  };

  return (
    <div className={style.habitWeekly}>
      <div className={style.week}>
        {Object.values(weekDays).map((label, index) => (
          <li className={style.todoSticker} key={index}>
            {label}
          </li>
        ))}
      </div>
      <div className={style.weeklyGoals}>
        <p className={style.todo}>미라클 모닝 6시 기상</p>
        <ul className={style.todoWeek}>
          {Object.keys(weekDays).map((key) => (
            <li
              className={style.todoSticker}
              key={key}
            >
              <Sticker color={sticker.color} num={sticker.num} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HabitWeekly;
