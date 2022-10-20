
import './App.css';
//import {BrowserRouter as Router , Route} from "react-router-dom";
import Login from './pages/login'
import Register from './pages/register'
import Main from './pages/main'
import {Routes, Route} from "react-router-dom";

function App() {
  return (
     <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
     </Routes>
  );
}

export default App;
