import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {Card} from '../card/Card';
import { saveDrivers } from "../../redux/actions";
import { ErrorInSearchDriver } from "../errorInSearchDriver/ErrorInSearchDriver";
import style from "./Pagination.module.css"

export const Pagination = ({drivers, error}) => {
    const dispatch = useDispatch()
//number of pages
    const pages = []
for(let i = 1; i<= Math.ceil(drivers.length/9); i++){
    pages.push(i)
}
console.log(pages)
const [currentPage, setCurrentPage] = useState(1);

const handleClick = ({ target }) => {
    if(target.value === "No"){
dispatch(saveDrivers())
    }

if(currentPage > 10 && target.value === "Previous Section"){
        setCurrentPage(currentPage -1)
    }

    if(target.value !== "Siguiente" && target.value !== "Anterior"){
        setCurrentPage(Number(target.textContent))
    }

    if(target.value === "Siguiente"){
        if(currentPage === pages.length){
            setCurrentPage(pages.length)
        } else{
            setCurrentPage(currentPage + 1)
        }
    }
    
    if(target.value === "Anterior"){
        if(currentPage === 1){
            setCurrentPage(1)
        } else{
            setCurrentPage(currentPage - 1)
        }
    }
};
console.log(currentPage)

//get drivers in each page
const [driversInEachPage, setDriversInEachPage] = useState([])
const [buttons, setButtons] = useState([])

const getDriversInEachPage = (currentPage) => {
    const indexOfDrivers = currentPage * 9
    setDriversInEachPage(drivers.slice(indexOfDrivers - 9, indexOfDrivers))
    };

useEffect(()=>{
    getDriversInEachPage(currentPage)
    setButtons([...pages.slice(currentPage - 1, currentPage + 9)])
    console.log(currentPage + 9)
    }, [currentPage])

useEffect(()=>{
    setCurrentPage(1)
    getDriversInEachPage(currentPage)
    setButtons([...pages.splice(currentPage - 1, currentPage + 9)])
}, [drivers])


return (
    <div>
        <div>
        {error && <ErrorInSearchDriver error={error.error} handleClick={handleClick} /> }
        </div>

    {drivers.length > 0 &&
    <div className={style.containerButtons}>
    <div><button onClick={handleClick} value="Anterior" className={style.buttons}>◁</button></div>
    <div>
    {buttons.map((page, index) => {
    return <button key={index} onClick={handleClick}
    className={page === currentPage ? style.currentButton : style.button}>{page}</button>})} </div>
    <div><button onClick={handleClick} value="Siguiente" className={style.buttons}>▷</button> </div>
    </div>}    
    <div  className={style.containerCards}>
    {drivers.length > 0 && driversInEachPage.map((driver, index) => 
     <Card driver={driver} key={index}/> 
                )}
          </div>

        </div>
    );
};