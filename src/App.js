import './App.css';
import CustomAlerts from './components/alerts/CustomAlerts';
import NavBar from './components/navbar/NavBar';
import QuizPanel from './components/panel/QuizPanel';
import AdminWindow from './components/windows/AdminWindow';
import AddQuestion from './components/panel/AddQuestion';

function App() {
  return (
    <div className="App">
        <NavBar />
      
        <AdminWindow />
       
    </div>
  );
}

export default App;
