import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TodaysRoutine from "./pages/TodaysRoutines/Routines.jsx"
import TodaysConcentration from "./pages/TodaysConcentrations/Concentrations.jsx";
import NotFound from "./pages/NotFound.jsx";

//React Router 6.4v 데이터 라우터 PAI 방식
const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/routines", element: <TodaysRoutine/> },
  { path: "/concentrations", element: <TodaysConcentration/> },
  { path: "*", element: <NotFound/> },
]);

export default router;