import React from "react";
import AppRoutes from "./routes/app.routes";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  return(
    <>
    <AppRoutes/>
    <ToastContainer autoClose={1000}/>

    </>
  )
}


export default App;