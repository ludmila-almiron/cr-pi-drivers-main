import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home'
import Nav from './components/nav/Nav'
import {Detail} from './components/detail/Detail'
function App() {

  return (
    <Router>
    <div>
      <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail/>} />
      </Routes>
      <Nav/>
    </div>
  </Router>
  )
}

export default App
