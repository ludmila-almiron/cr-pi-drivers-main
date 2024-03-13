import style from './Nav.module.css'
import { saveDrivers, getTeams } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const Nav = () => {
const navigate = useNavigate ()
const dispatch = useDispatch()

useEffect(() =>{
    dispatch(saveDrivers())
    dispatch(getTeams())
    },[])

const handleClick = () => {
    navigate('/home')
}
    return (
        <div className={style.containerLanding}> 
        <div className={style.containerImg}> <img src='https://i.pinimg.com/564x/b6/0c/90/b60c90ed61bbd04cc298f9ece2b40dd0.jpg'className={style.img}></img></div>
        <div className={style.containerH1Home}>
        <div className={style.containerH1}><h1 className={style.h1}> EXPLORE ALL THE DRIVERS </h1></div>
        <div className={style.containerHome}> <button className={style.home} onClick={handleClick}>LET'S GO 🏁</button></div> </div>
        </div>
    )
}

export default Nav