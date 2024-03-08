import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import style from './Nav.module.css'

const Nav = () => {
const location = useLocation()
    return (
        <div>
            {location.pathname === '/' &&
            <div className={style.container}>  
            <h1>Explore all the drivers! </h1>
            <img src='https://i.pinimg.com/originals/b7/5c/f0/b75cf09a8e43fef0424c9d2237462f93.gif'></img>
            </div >}
            {location.pathname !== '/home' &&
           <Link to="/home" className={style.home}> 🏁 HOME 🏁</Link>
            }
          
        </div>
    )
}

export default Nav