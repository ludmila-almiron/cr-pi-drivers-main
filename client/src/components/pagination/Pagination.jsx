import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {Card} from '../card/Card';
import { saveDrivers } from "../../redux/actions";
import { ErrorInSearchDriver } from "../errorInSearchDriver/ErrorInSearchDriver";

export const Pagination = ({drivers, error}) => {
    const dispatch = useDispatch()
//number of pages
    const pages = []
for(let i = 1; i<= Math.ceil(drivers.length/9); i++){
    pages.push(i)
}
const [currentPage, setCurrentPage] = useState(1);

const handleClick = ({ target }) => {
    if(target.value === "No"){
dispatch(saveDrivers())
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

return (
        <div>
            <div>
                {error &&
             <ErrorInSearchDriver error={error.error} handleClick={handleClick} /> }
            </div>
            <div>
                {drivers.length > 0 && driversInEachPage.map((driver, index) => 
                 <Card driver={driver} key={index}/>
                )}
            {drivers.length > 0 &&
                    <div>
                        <button onClick={handleClick} value="Anterior">⬅️ Previous</button>
                        <button onClick={handleClick} value="Siguiente"> Next ➡️</button>
                        <div>
                        {pages.map((page, index) => {
                return <button key={index} onClick={handleClick}>{page} </button>
             })}   
                        </div>
                    </div>
                }
          </div>


        </div>
    );
};