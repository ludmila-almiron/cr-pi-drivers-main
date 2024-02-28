import { useState,useEffect } from "react";
export const Pagination = ({drivers}) => {
const pages = []

for(let i = 1; i<= Math.ceil(drivers.length/9); i++){
    pages.push(i)
}

const [currentPage, setCurrentPage] = useState(0);

const handleClick = ({ target }) => {
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

useEffect(() => {
    console.log(currentPage); 
}, [currentPage]);


    return (
        <div>
            <div>
            {pages.map((page, index) => {
                return <button key={index} onClick={handleClick}>{page} </button>;
            })}
            </div>
          <div> 
            <button onClick={handleClick}>
                Anterior
            </button>
            <button onClick={handleClick}>Siguiente</button>
          </div>
        </div>
    );
};