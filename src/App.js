import './App.css';
import CustomAlerts from './components/alerts/CustomAlerts';
import NavBar from './components/navbar/NavBar';
import QuizPanel from './components/panel/QuizPanel';
import AdminWindow from './components/windows/AdminWindow';
import AddQuestion from './components/panel/AddQuestion';
import UserPanel from './components/user/UserPanel';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ResultPanel from './components/user/ResultPanel';

function App() {
  return (
  

<div>
  <NavBar />
<Router>
      <Routes>
       
          <Route index element={ <AdminWindow />} />
          <Route path='/user/:id' element={<UserPanel/>} />
          <Route path='/result/:id' element={<ResultPanel/>} />

         

         
      
      </Routes>
    </Router>
        
</div>
       
    
  );
}

export default App;
