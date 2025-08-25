import { createBrowserRouter } from "react-router-dom";
//import Home from "./pages/Home.jsx";
import TodaysRoutine from "./pages/Routines.jsx"

//React Router 6.4v 데이터 라우터 PAI 방식
const router = createBrowserRouter([
  { path: "/", element: <TodaysRoutine/> },
]);

export default router;