import { SearchBar } from "../searchbar/SearchBar";
import {Cards} from '../cards/Cards'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <SearchBar/>
            <Link to="/create"> Create </Link>
            <Cards/>
            <button/>
        </div>
    )
}

export default Home; 