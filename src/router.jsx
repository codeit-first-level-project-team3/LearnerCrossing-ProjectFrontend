import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, useParams, Navigate } from "react-router-dom";
import useStudy from "./contexts/StudyStorage.jsx";
import { useAsync } from "./hooks/useAsync.js";

import Home from "./pages/Home/Home.jsx";
import TodaysHabits from "./pages/TodaysHabits/TodaysHabits.jsx";
import TodaysFocus from "./pages/TodaysFocus/TodaysFocus.jsx";
import NotFound from "./pages/NotFound.jsx";
import StudyDetail from "./pages/StudyDetail/StudyDetail.jsx";
import StudyCreate from "./pages/StudyCreate/StudyCreate.jsx"; 
import StudyEdit from "./pages/StudyEdit/StudyEdit.jsx"; 
import LoadingPage from "./pages/Loading/Loading.jsx";

//접근 보호 (조건 불만족 시 특정 페이지로 이동) - 비밀번호 방식
const PrivateRoute = ({ children }) => {
  const { id } = useParams();
  const { studyId, token, checkToken } = useStudy();
  const [ isAuthorized, setIsAuthorized ] = useState(true); // null: 로딩 중
  const [ isPending, error, checkTk ] = useAsync(checkToken);

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        if(!token){return;}
        const res = await checkTk(token);
        setIsAuthorized(res);// true. false
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    checkAuth();
  }, []);

  /* 
  1) 주소창 id 존재 여부
  2) localeStorage id 일치 여부
  3) 비밀번호 db 일치 여부 
  */
  return id && studyId === id ? !isPending ? isAuthorized ? children 
    : <Navigate to={`/studyDetail/${id}`} />
    : <LoadingPage /> //비밀번호 일치 여부 판단 중에 보여줄 페이지 
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
