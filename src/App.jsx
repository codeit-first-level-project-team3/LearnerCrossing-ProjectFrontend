import './global.css'
import router from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div>
    <RouterProvider router={router}/>
    </div> 
  );
}

export default App

//0831 develop 머지 완료