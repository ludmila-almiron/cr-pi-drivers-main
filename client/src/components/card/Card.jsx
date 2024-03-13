import {Link} from 'react-router-dom' 
import style from './Card.module.css'
export const Card = ({driver})=> {
    const {name,teams,image,id,surname} = driver
    return (
        <div className={style.container}>
            <img src={image} width="200" height="250"/>
            <div className={style.containerTeamName}>
            <div className={style.name}><Link to={`/detail/${id}`}>
            <span></span>{name.toUpperCase()} {surname.toUpperCase()}</Link> 
            </div>
            <div className={style.teams}>
            {teams && teams.map((team, index) => (
            <div key={index} className={style.team} >{team && team.toUpperCase()} </div>))}</div>
            </div>
        </div>
    )
}