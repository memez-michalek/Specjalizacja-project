
import './App.css';
//import {BrowserRouter as Router , Route} from "react-router-dom";
import Navigation from './components/navbar'
import Login from './pages/login'
import {Routes, Route} from "react-router-dom";

function App() {
  return (
     <Routes>
        {/*<Route path="/" element={<Home/>}></Route>*/}
        <Route path="/login" element={<Login/>}></Route>
     </Routes>
  );
}

export default App;
