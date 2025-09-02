import HabitWeekly from "../../molecules/HabitWeekly/HabitWeekly";
import styles from "./WeeklyHabitForm.module.css";

function WeeklyHabitForm({ habits, color, colorNum }) {
  const habitsEntries = Object.entries(habits);
  // console.log("habit 0 : " + habits[0].weeklyClear);
  // 로딩처리 / 빈 객체 처리 필요
  return (
    <div className={styles.weeklyHabitForm}>
      {habitsEntries.map(([id, { name, weeklyClear }]) => (
        <HabitWeekly
          stickerColor={color}
          stickerNum={colorNum}
          weeklytodo={name}
          weeklyState={weeklyClear}
        />
      ))}
    </div>
  );
}

export default WeeklyHabitForm;
