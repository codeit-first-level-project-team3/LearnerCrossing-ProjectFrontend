import HabitWeekly from "../../molecules/HabitWeekly/HabitWeekly";
import styles from "./WeeklyHabitForm.module.css";

function WeeklyHabitForm({ habits, color, colorNum }) {
  return (
    <div className={styles.weeklyHabitForm}>
      {Object.entries(habits).map(([id, { name, weeklyClear }]) => (
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
