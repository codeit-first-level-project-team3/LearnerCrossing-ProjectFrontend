import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, useParams, Navigate } from "react-router-dom";
import useStudy from "./contexts/StudyStorage.jsx";
import Home from "./pages/Home/Home.jsx";
import TodaysHabits from "./pages/TodaysHabits/TodaysHabits.jsx";
import TodaysFocus from "./pages/TodaysFocus/TodaysFocus.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudyDetail from "./pages/StudyDetail/StudyDetail.jsx";
import StudyCreate from "./pages/StudyCreate/StudyCreate.jsx"; 
import StudyEdit from "./pages/StudyEdit/StudyEdit.jsx"; 

//접근 보호 (조건 불만족 시 특정 페이지로 이동)
const PrivateRoute = ({ children }) => {
  const { id } = useParams();
  const { studyId, password, checkPw } = useStudy();
  const [ isAuthorized, setIsAuthorized ] = useState(); // null: 로딩 중

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const res = await checkPw(password);
        setIsAuthorized(res);
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  return id && studyId === id ? isAuthorized ? children 
    : <Navigate to={`/studyDetail/${id}`} />
    : <Navigate to="/" />
};

// React Router 6.4v 데이터 라우터 API 방식
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/studyDetail/:id", 
    element: <Outlet />,
    children: [
      { index: true, element: <StudyDetail /> },
      { path: "studyEdit", element: <PrivateRoute><StudyEdit /> </PrivateRoute>}, 
      { path: "habits", element: <PrivateRoute><TodaysHabits /></PrivateRoute> },
      { path: "focus", element: <PrivateRoute><TodaysFocus /></PrivateRoute> },
    ]
  },
  { path: "/studyCreate", element: <StudyCreate /> }, 
  { path: "*", element: <NotFound /> },
]);

export default router;
