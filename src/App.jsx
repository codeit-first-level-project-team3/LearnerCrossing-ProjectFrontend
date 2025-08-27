import './global.css'
import router from "./router";
import { RouterProvider } from "react-router-dom";
import GNB from "./components/organisms/GNB/GNB";
import HabitButton from './components/molecules/HabitButton/HabitButton';
import MakeButton from './components/molecules/MakeButton/MakeButton';
import Search from './components/molecules/Search/Search';
import Sort from './components/molecules/Sort/Sort';
import Input from './components/atoms/Input/Input';

function App() {
  return (
    <div>
    <RouterProvider router={router} />
    {/* 일반 텍스트 인풋 */}
      <Input type="text" placeholder="아이디를 입력하세요" />

      {/* 비밀번호 인풋 (눈 아이콘 없음) */}
      <Input type="password" placeholder="비밀번호를 입력하세요" />

      {/* 비밀번호 인풋 (눈 아이콘 토글 표시) */}
      <Input type="password" placeholder="비밀번호를 입력하세요" showToggle />
    </div>
  );
}

export default App
