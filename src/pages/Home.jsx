import GoToBtn from "../components/molecules/GotoBtn/GoToBtn";

function Home() {
  return (
    <>
      <h1>Hello World!</h1>
      <p> 임시 이동 버튼</p>
      <GoToBtn to='/studyCreate' name='스터디 만들기' />
      <GoToBtn to='/studyEdit' name='스터디 수정' />
      <GoToBtn to='/studyDetail' name='스터디 상세' />
      <GoToBtn to='/focus' name='오늘의 집중' />
      <GoToBtn to='/habits' name='오늘의 습관' />
    </>
  );
}

export default Home;
