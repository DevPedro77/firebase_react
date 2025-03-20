import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Admin from '../pages/Admin';


function AppRoutes() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </Router>
  )
}

export default AppRoutes;
