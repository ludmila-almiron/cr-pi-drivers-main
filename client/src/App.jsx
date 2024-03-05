import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './components/home/Home'
import Nav from './components/nav/Nav'
import {Detail} from './components/detail/Detail'
import {Form} from './components/form/Form'
import { UserForm } from './components/userForm/userForm';
import { useNavigate, useLocation } from 'react-router-dom'


function App() {
const navigate = useNavigate()
const location = useLocation()

const loginUser = () =>{
  navigate("/home")
  }

  return (
    
    <div>
      <Routes>
        <Route path="/" element={<UserForm loginUser={loginUser}/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail/>} />
      <Route path="/create" element={<Form/>} />
      </Routes>
      {location.pathname !== '/' && <Nav />}
    </div>
  )
}

export default App