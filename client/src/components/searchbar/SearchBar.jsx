import { useDispatch } from "react-redux";
import { searchDriver } from "../../redux/actions";
import { useState } from "react";

export const SearchBar = () => {
const dispatch = useDispatch()
const [valueSearch, setValueSearch] = useState("")

const handleChange = ({target}) => {
setValueSearch(target.value)
}

const handleClick = () =>{
dispatch(searchDriver(valueSearch))
    }



    return (
        <div>
            <input id="inputSearch" value={valueSearch} placeholder="Search driver..." onChange={handleChange} />
            <button onClick={handleClick}>SEARCH</button>
        </div>
    );
}