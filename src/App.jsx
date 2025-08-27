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
import HabitFocusButton from './components/molecules/HabitFocusButton/HabitFocusButton';
import EditButton from './components/molecules/EditButton/EditButton';
import ConfirmButton from './components/molecules/ConfirmButton/ConfirmButton';
import CancelButton from './components/molecules/CancelButton/CancelButton';

function App() {
  return (
    <div>
    <RouterProvider router={router} />
    <CancelButton />
    </div>
  );
}

export default App
