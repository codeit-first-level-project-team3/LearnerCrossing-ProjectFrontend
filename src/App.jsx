import './global.css'
import router from "./router";
import { RouterProvider } from "react-router-dom";
import GNB from "./components/organisms/GNB/GNB";
import HabitButton from './components/molecules/HabitButton/HabitButton';
import MakeButton from './components/molecules/MakeButton/MakeButton';

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
    </div> 
  );
}

export default App
