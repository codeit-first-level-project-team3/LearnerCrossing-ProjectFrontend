import HabitWeekly from "../../molecules/HabitWeekly/HabitWeekly";
import styles from "./WeeklyHabitForm.module.css";

function WeeklyHabitForm({ habits, isLoading, color, colorNum }) {
  const habitsEntries = Object.entries(habits);
  const isHabits = habitsEntries.length === 0 ? false : true; // 객체가 있는지

  return (
    <div className={styles.weeklyHabitForm}>
      {!isLoading && isHabits && 
        <HabitWeekly
          key={habits[0].id} // key 추가
          stickerColor={color}
          stickerNum={colorNum}
          weeklytodo={habits[0].name}
          weeklyState={habits[0].weeklyClear}
          isTop={true}
        />
      }
      {!isLoading && isHabits &&
        habitsEntries.slice(1, habitsEntries.length).map(([id, { name, weeklyClear }]) => (
          <HabitWeekly
            key={id} // key 추가
            stickerColor={color}
            stickerNum={colorNum}
            weeklytodo={name}
            weeklyState={weeklyClear}
          />
        ))
      }
      {/* 습관이 없는 경우 */}
      {!isHabits && !isLoading &&
        <div className={styles.empty}>
          <p>아직 습관이 없어요</p>
          <p>오늘의 습관에서 습관을 생성해보세요</p>
        </div>
      }
      {/* 로딩 처리 */}
      {isLoading && (
        <div className={styles.loadingBox}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>LOADING...</p>
        </div>
      )}
    </div>
  );
}

export default WeeklyHabitForm;
