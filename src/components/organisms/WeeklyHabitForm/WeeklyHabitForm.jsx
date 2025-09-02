import HabitWeekly from "../../molecules/HabitWeekly/HabitWeekly";
import styles from "./WeeklyHabitForm.module.css";

function WeeklyHabitForm({ habits, color, colorNum }) {
  return (
    <div className={styles.weeklyHabitForm}>
      {Object.entries(habits).map(([id, { name, state }]) => (
        <HabitWeekly
          stickerColor={color}
          stickerNum={colorNum}
          weeklytodo={name}
          weeklyState={state}
        />
      ))}
    </div>
  );
}

export default WeeklyHabitForm;
