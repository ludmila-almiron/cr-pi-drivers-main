import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import style from './Detail.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { filterDriversCopy } from '../../redux/actions'

export const Detail = () =>{

const { id } = useParams()
const dispatch = useDispatch()
const [driver, setDriver] = useState([])

useEffect(()=>{
dispatch(filterDriversCopy())
}, [])


const navigate = useNavigate()


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


const handleClick = () =>{
navigate('/home')
}





let {image, name, teams, dob, description, nationality, number, surname} = driver


dob ? dob = driver.dob.split('T')[0] : dob

return (
    <div className={style.container}>
        <div className={style.containerImgButton}>
        <img src={image} width="300" height="350"></img>
        <button className={style.button} onClick={handleClick}><>BACK TO HOME</></button>
        </div>
        <div className={style.containerData}>
        <div className={style.name}> 🏁 {name && name.toUpperCase()} {surname && surname.toUpperCase()}</div>
        {teams && (
        <div className={style.datos}> {teams.join(', ')}</div>)}
        <div className={style.datos}> ID {id} </div>
        <div className={style.datos}> born {dob}</div>
        <div className={style.datos}> {nationality}</div>
        {number && number !== "\\N" && (
        <div className={style.datos} > Number {number} </div>)}
        {description && (<div className={style.containerDescription}>
            <p className={style.description}>{description}</p>
        </div>)}
        </div>  
</div>
    )
}