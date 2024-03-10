import { SearchBar } from "../searchbar/SearchBar";
import {Cards} from '../cards/Cards'
import style from "./Home.module.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
const error = useSelector(state => state.errors)
const navigate = useNavigate()

const handleClick = () =>{
navigate('/create')
    }
    return (
        <div>
            <div className={style.container}>
                {!error &&
                <div className={style.containerSearchCreate}> 
                 <SearchBar/>
                 <div className={style.containerCreate}> <button onClick={handleClick} className={style.create}>CREATE YOUR OWN DRIVER</button></div>
                </div>}
                <Cards/> 
            </div>

        </div>
    )
}

export default Home; 