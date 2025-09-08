import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import TodaysHabits from "./pages/TodaysHabits/TodaysHabits.jsx";
import TodaysFocus from "./pages/TodaysFocus/TodaysFocus.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudyDetail from "./pages/StudyDetail/StudyDetail.jsx";
import StudyCreate from "./pages/StudyCreate/StudyCreate.jsx"; 
import StudyEdit from "./pages/StudyEdit/StudyEdit.jsx"; 

// React Router 6.4v 데이터 라우터 API 방식
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/studyDetail", element: <StudyDetail /> },
  { path: "/studyCreate", element: <StudyCreate /> }, 
  { path: "/studyEdit/:id", element: <StudyEdit /> }, 
  { path: "/habits", element: <TodaysHabits /> },
  { path: "/focus", element: <TodaysFocus /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
