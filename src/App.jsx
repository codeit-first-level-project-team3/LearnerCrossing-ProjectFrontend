import './global.css'
import router from "./router";
import { RouterProvider } from "react-router-dom";
import GNB from "./components/organisms/GNB/GNB";
import HabitButton from './components/molecules/HabitButton/HabitButton';
import MakeButton from './components/molecules/MakeButton/MakeButton';
import Search from './components/molecules/Search/Search';
import Sort from './components/molecules/Sort/Sort';
import INput from './components/atoms/Input/Input'
import MoreButton from './components/molecules/MoreButton/MoreButton';

function App() {
  return (
    <div>
    <RouterProvider router={router} />
    <MoreButton />
    </div>
  );
}

export default App
