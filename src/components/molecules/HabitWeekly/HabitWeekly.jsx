import { useState } from "react";
import Sticker from "../../atoms/Sticker";
import style from "./HabitWeekly.module.css";

function HabitWeekly({
  stickerColor,
  stickerNum,
  weeklyState,
  weeklytodo,
  isTop = false,
}) {
  const weekDays = {
    mon: "월",
    tue: "화",
    wed: "수",
    thu: "목",
    fri: "금",
    sat: "토",
    sun: "일",
  };

  // todo 상태 -> 나중엔 prop로 상태를 받아와서 적용
  const [weeklyCheck, setWeeklyCheck] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const toggleTodo = (day) => {
    // todo 상태 토글 클릭 핸들러
    setWeeklyCheck((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div className={style.habitWeekly}>
      {isTop && (
        <div className={style.week}>
          <p className={style.todo}></p>
          <ul className={style.todoWeek}>
            {Object.values(weekDays).map((label, index) => (
              <li className={style.todoSticker} key={index}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={style.weeklyGoals}>
        <p className={style.todo}>{weeklytodo}</p>
        <ul className={style.todoWeek}>
          {Object.keys(weekDays).map((key) => (
            <li
              className={style.todoSticker}
              key={key}
              onClick={() => toggleTodo(key)}
            >
              <Sticker
                color={weeklyCheck[key] ? stickerColor : "empty"}
                num={stickerNum}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HabitWeekly;
