import './global.css'
import router from "./router";
import { RouterProvider } from "react-router-dom";
import GNB from "./components/organisms/GNB/GNB";
import HabitButton from './components/molecules/HabitButton/HabitButton';
import MakeButton from './components/molecules/MakeButton/MakeButton';
import Search from './components/molecules/Search/Search';
import Sort from './components/molecules/Sort/Sort';
import PlusButton from './components/molecules/PlusButton/PlusButton';

function App() {
  return (
    <div>
    <RouterProvider router={router}/>
    {/* gnb 스터디 만들기 버튼이 없는 버전 test */}
    <GNB />
    <HabitButton />
    {/* gnb 스터디 만들기 버튼이 있는 버전 test */}
    <GNB showCreateStudy={true} />
    <MakeButton />
    <Search placeholder="검색"/>
    <Sort label="최근 순" />
    <PlusButton />
    </div> 
  );
}

export default App