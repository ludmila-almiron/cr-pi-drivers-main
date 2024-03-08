import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './components/home/Home'
import Nav from './components/nav/Nav'
import {Detail} from './components/detail/Detail'
import {Form} from './components/form/Form'
import { UserForm } from './components/userForm/UserForm';
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
const navigate = useNavigate()
const location = useLocation()
const [access, setAcces] = useState(false)

const signUpUser = () =>{
  setAcces(true)
  setForm(false)
  navigate("/")
  }
  //useEffect(() => {!access && navigate("/")}, [access])
  return (
    
    <div>
      {access && location.pathname === '/' && <Nav />}
      <Routes>
      <Route path="/" element={<UserForm signUpUser={signUpUser}/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail/>} />
      <Route path="/create" element={<Form/>} />
      </Routes>
    </div>
  )
}

export default App