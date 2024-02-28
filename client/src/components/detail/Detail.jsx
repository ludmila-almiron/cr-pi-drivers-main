import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
//import image from '../../../../images/driverWithoutImage.jpg'

export const Detail = () =>{

const { id } = useParams()
console.log(id)

const [driver, setDriver] = useState([])
console.log(driver)

useEffect(()=>{
    try{
        const getDriver = async (id) => {
            const {data} = await axios.get(`http://localhost:3001/drivers/${id}`)
            setDriver(data)
        }
        getDriver(id)
    }
    catch(error){
        console.log(error.message)
    }

}, [])

const {image, name, teams, dob, description, nationality, number} = driver
return (
    <div>
        <img src={image} width="300" height="350"></img>
<div> Name:{name && name.forename} {name && name.surname} </div>
<div>Dob: {dob}</div>
<div> Nationality: {nationality}</div>
{teams && (
    <div> Teams: {teams}</div>
)}
{number !== "\\N" && (
<div> Number: {number} </div>
)}
{description && (
    <div>
        Description: {description}
    </div>
)}
    </div>
)
}