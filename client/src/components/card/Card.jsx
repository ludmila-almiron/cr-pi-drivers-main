import {Link} from 'react-router-dom' 
export const Card = ({driver})=> {
    const {name,teams,image,id,surname} = driver
    return (
        <div>
            <img src={image} width="200" height="250"/>
            <div>
            <Link to={`/detail/${id}`}> Name: {name} {surname}
            </Link>
            </div>
            <div> Teams: {teams.join(', ')} </div>
            <div> 
            </div>
          
        </div>
    )
}