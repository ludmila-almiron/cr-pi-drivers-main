import {Link} from 'react-router-dom'
const Nav = () => {
    return (
        <div>
            <ul>
            <Link to="/home"> Home </Link>
            <Link to="/about"> About </Link>
            </ul>
        </div>
    )
}

export default Nav