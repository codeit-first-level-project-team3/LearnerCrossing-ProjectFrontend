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

  const boolenState = weeklyState.split("|").map(el => el==0 ? false : true);

  return (
    <div className={style.habitWeekly}>
      {isTop && (
        <div className={style.week}>
          <p className={`${style.todo} ${style.none}`}></p>
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
          {Object.keys(weekDays).map((key, i) => (
            <li className={style.todoSticker} key={key}>
              <Sticker
                color={boolenState[i] ? stickerColor : "empty"}
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
