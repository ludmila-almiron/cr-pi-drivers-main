import {Link} from 'react-router-dom' 
import style from './Card.module.css'
export const Card = ({driver})=> {
    const {name,teams,image,id,surname} = driver
    return (
        <div className={style.container}>
            <div className={style.name}><Link to={`/detail/${id}`}>
            <span className={style.emoji}>🏎 </span>{name.toUpperCase()} {surname.toUpperCase()}</Link> </div>
            <img src={image} width="200" height="250"/>
            <div className={style.teams}> 🏁 TEAMS: {teams.join(', ')} </div>
        </div>
    )
}