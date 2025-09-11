import { RouterProvider } from "react-router-dom";
import router from "./router";

import './global.css'

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App