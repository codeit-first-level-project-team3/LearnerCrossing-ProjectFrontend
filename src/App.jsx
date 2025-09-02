import { useState } from 'react';
import { RouterProvider } from "react-router-dom";
import UserContext from './contexts/UserContext';
import router from "./router";

import './global.css'
import { useUserPoint } from './hooks/useUserPoint';

function App() {

  /* Context - 전체 페이지 공용 변수, 함수 */
  const [ point, plusPoint ] = useUserPoint(); //포인트 훅 - app.js에서만 씁니다.
  const [ password, checkPw ] = usePassword(); //비밀번호 훅

  const contexts = {
    point,
    plusPoint,
    password,
    checkPw,
  }

  return (
    <UserContext.Provider value={contexts}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  );
}

export default App

//0831 develop 머지 완료