import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Card} from '../card/Card';
import { saveDrivers, set_current_page } from "../../redux/actions";
import { ErrorInSearchDriver } from "../errorInSearchDriver/ErrorInSearchDriver";
import style from "./Pagination.module.css"

export const Pagination = ({drivers, error}) => {
const dispatch = useDispatch()
//number of pages
    const pages = []
for(let i = 1; i<= Math.ceil(drivers.length/9); i++){
    pages.push(i)
}

const current_Page_State = useSelector(state => state.currentPage)

const handleClick = ({ target }) => {
    if(target.value === "No"){
        dispatch(saveDrivers())
        dispatch(set_current_page(1))
    }

if(target.value !== "Siguiente" && target.value !== "Anterior" && target.value !== "No"){
        dispatch(set_current_page(Number(target.textContent)))
    }

if(target.value === "Siguiente"){
        if(current_Page_State === pages.length){
            dispatch(set_current_page(pages.length))
        } else{
            dispatch(set_current_page(current_Page_State + 1))
        }
    }
    
if(target.value === "Anterior"){
        if(current_Page_State === 1){
            dispatch(set_current_page(1))
        } else{
            dispatch(set_current_page(current_Page_State - 1))
        }
    }
};

//get drivers in each page
const [driversInEachPage, setDriversInEachPage] = useState([])
const [buttons, setButtons] = useState([])

const getDriversInEachPage = (current_Page_State) => {
    const indexOfDrivers = current_Page_State * 9
    setDriversInEachPage(drivers.slice(indexOfDrivers - 9, indexOfDrivers))
    };

useEffect(()=>{
    getDriversInEachPage(current_Page_State)
    setButtons([...pages.slice(current_Page_State - 1, current_Page_State + 9)])
    }, [current_Page_State])

useEffect(()=>{
getDriversInEachPage(current_Page_State)
setButtons([...pages.slice(current_Page_State - 1, current_Page_State + 9)])    
}, [drivers])

console.log(current_Page_State)
console.log(buttons)
return (
    <div>
    {drivers.length > 0 &&
    <div className={style.containerButtons}>
    <div><button onClick={handleClick} value="Anterior" className={style.buttons}>◁</button></div>
    <div>
    {buttons.map((page, index) => {
    return <button key={index} onClick={handleClick}
    className={page === current_Page_State ? style.currentButton : style.button}>{page}</button>})} </div>
    <div><button onClick={handleClick} value="Siguiente" className={style.buttons}>▷</button> </div>
    </div>}    
    <div  className={style.containerCards}>
    {drivers.length > 0 && driversInEachPage.map((driver, index) => 
     <Card driver={driver} key={index}/> 
                )}
          </div>
          {error ? (
  <div>
    <ErrorInSearchDriver error={error.error} handleClick={handleClick} />
  </div>
) : null}
        </div>
    );
};