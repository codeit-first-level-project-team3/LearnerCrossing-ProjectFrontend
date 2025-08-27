import HabitWeekly from "../../components/molecules/HabitWeekly/HabitWeekly";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";

function StudyDetail() {
  const gotobtn = [
    { to: "/concentrations", name: "오늘의 집중" },
    { to: "/", name: "홈" },
  ];
  return (
    <>
      <section>
        <StudyDescription
          goToBtn={gotobtn}
          description="Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
        />
        <HabitWeekly />
      </section>
    </>
  );
}

export default StudyDetail;
