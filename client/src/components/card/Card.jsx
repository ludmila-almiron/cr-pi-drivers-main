import {Link} from 'react-router-dom' 
export const Card = ({driver})=> {
   const {name, image, teams, id} = driver
    return (
        <div>
            <img src={image} width="200" height="250"/>
            <div>
            <Link to={`/detail/${id}`}> Name: {name.forename} {name.surname}
            </Link>
            </div>
            <div>Teams: {teams}</div>
        </div>
    )
}