import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {Card} from '../card/Card';
import { saveDrivers } from "../../redux/actions";

export const Pagination = ({drivers}) => {
    const dispatch = useDispatch()
//number of pages
    const pages = []
for(let i = 1; i<= Math.ceil(drivers.length/9); i++){
    pages.push(i)
}
const [currentPage, setCurrentPage] = useState(1);

const handleClick = ({ target }) => {
    if(target.textContent === "Ok"){
dispatch(saveDrivers())
    }
    if(target.textContent !== "Siguiente" && target.textContent !== "Anterior"){
        setCurrentPage(Number(target.textContent))
    }
    if(target.textContent === "Siguiente"){
        setCurrentPage(currentPage + 1)
    }
    if(target.textContent === "Anterior"){
        setCurrentPage(currentPage - 1)
    }
};

//get drivers in each page
const [driversInEachPage, setDriversInEachPage] = useState([])

const getDriversInEachPage = (currentPage) => {
    const indexOfDrivers = currentPage * 9
    setDriversInEachPage(drivers.slice(indexOfDrivers - 9, indexOfDrivers))
    };

useEffect(()=>{
    getDriversInEachPage(currentPage)
    }, [currentPage])

useEffect(()=>{
    setCurrentPage(1)
    getDriversInEachPage(currentPage)
}, [drivers])

console.log(drivers)
return (
        <div>
            <div>
                {driversInEachPage.map((driver, index) => driver.error ?
                <div>
                <p>{driver.error}</p>
                <button onClick={handleClick}>Ok</button>
                </div>
                :
                 <Card driver={driver} key={index}/>
                )}
                <div>
                {pages.map((page, index) => {
                return <button key={index} onClick={handleClick}>{page} </button>
             })}   
                <div> 
                </div> 
            <button onClick={handleClick}>Anterior</button>
            <button onClick={handleClick}>Siguiente</button>
          </div>
            </div>
        </div>
   
    );
};