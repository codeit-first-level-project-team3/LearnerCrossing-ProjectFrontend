import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TodaysHabits from "./pages/TodaysHabits/TodaysHabits.jsx";
import TodaysFocus from "./pages/TodaysFocus/TodaysFocus.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudyDetail from "./pages/StudyDetail/StudyDetail.jsx";

//React Router 6.4v 데이터 라우터 PAI 방식
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/studyDetail", element: <StudyDetail /> },
  { path: "/routines", element: <TodaysHabits /> },
  { path: "/concentrations", element: <TodaysFocus /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
