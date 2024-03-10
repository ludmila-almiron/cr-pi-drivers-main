import { useDispatch } from "react-redux";
import { searchDriver } from "../../redux/actions";
import { useState } from "react";
import style from './SearchBar.module.css'

export const SearchBar = () => {
const dispatch = useDispatch()
const [valueSearch, setValueSearch] = useState("")

const handleChange = ({target}) => {
setValueSearch(target.value)
}

const handleSearch = () =>{
dispatch(searchDriver(valueSearch))
setValueSearch("")
    }


return (
    <div className={style.containerSearchBar}>
    <div className={style.containerInput}><input id="inputSearch" value={valueSearch} placeholder="Search driver..." onChange={handleChange} className={style.input} /> </div>
    <div className={style.containerButton}><button onClick={handleSearch} className={style.button}>SEARCH</button>  </div>    
    </div>
    );
}