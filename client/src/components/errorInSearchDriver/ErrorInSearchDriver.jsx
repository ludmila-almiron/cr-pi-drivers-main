import {Link} from 'react-router-dom'

export const ErrorInSearchDriver = ({error, handleClick}) => {
    return(
        <div>
            <h2>{error}</h2>
            <button onClick={handleClick} value="No">No</button>
            <button value="Create"><Link to="/create">Yes</Link></button>
        </div>
    )
}