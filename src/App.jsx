import { RouterProvider } from "react-router-dom";
import { StudyProvider } from './contexts/StudyContext'; 
import router from "./router";

import './global.css'

function App() {

  return (
      <StudyProvider>
        <RouterProvider router={router}/>
      </StudyProvider>
  );
}

export default App

//0831 develop 머지 완료