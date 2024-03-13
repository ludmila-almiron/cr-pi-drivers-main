import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios'
import { createDriver, getTeams, saveDrivers } from "../../redux/actions";
import { validations } from "./errors";
import { errors_empty_fields } from "./errors_empty_fields";
import { useSelector } from 'react-redux';
import style from "./Form.module.css"
import { useNavigate } from 'react-router-dom'

export const Form =()=>{
const dispatch = useDispatch()
const navigate = useNavigate()

const teams = useSelector(state => state.teams)

const [createdDriver, setCreatedDriver] = useState({
    name: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: ""
})
const[driverValidation, setDriverValidation] = useState({
    name: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: ""
})
const[emptyFields, setEmptyFields] = useState({
})

const[selectedTeams, setSelectedTeams] = useState([])
const[showError, setShowError] = useState("")
const[createdSuccesfully, setCreatedSuccesfully] = useState(false)


const handleForm = ({target}) => {
setCreatedDriver({
    ...createdDriver,
    [target.name]:target.value
})
setDriverValidation(validations({
    ...createdDriver,
    [target.name]: target.value
   }))
   setEmptyFields(errors_empty_fields({
    ...createdDriver,
    [target.name]: "not empty"
   }
   ))
setShowError("")
}

const handleTeamSelection =  ({target}) => {
   if(selectedTeams.includes(target.value)){
    setSelectedTeams([...selectedTeams.filter((teamId)=> teamId !== target.value)])
   } else{
    setSelectedTeams([...selectedTeams, target.value])
   }
}

useEffect(()=>{
    dispatch(getTeams())
}, [])

useEffect(()=>{
setCreatedDriver({
        ...createdDriver,
        teams: [...selectedTeams]
       }) 
setDriverValidation(validations({teams: [...selectedTeams]})) 
}, [selectedTeams])


const handleClick = () => {
    navigate('/home')
}

const handleSubmit = (event) => {
event.preventDefault()

setEmptyFields(errors_empty_fields(createdDriver))

   const validations = Object.values(driverValidation)
   if(validations.every(validation => ! validation)){

       axios.post('http://localhost:3001/drivers', createdDriver )
                .then(response => {
    
                    dispatch(createDriver(response.data));
                })
                .catch(error => {
                    console.error({error: error.message});
                });
    setCreatedSuccesfully(true)
    setShowError("The driver has been created successfully")
   }
   else{
    setShowError("Driver creation failed due to errors in the form. Please complete the data correctly.")
   }
}


return (
    <div className={style.container}>
        <div className={style.containerH1Form}>
        <div className={style.containerH1}><h1>CREATE YOUR OWN DRIVER</h1> </div>
        <div className={style.containerForm}>
        <form onSubmit={handleSubmit}>
            <div className={style.containerInputs}>
            <label htmlFor="name"> NAME </label>
            <input type="text" name="name" value={createdDriver.name} onChange={handleForm} className={style.inputs}/>
            <p className={style.errors}>{driverValidation.name && driverValidation.name} {emptyFields.name && emptyFields.name}</p>
        <div className={style.containerInputs}>
            <label htmlFor="surname"> SURNAME</label>
            <input type="text" name="surname" value={createdDriver.surname} onChange={handleForm}className={style.inputs} />
            <p className={style.errors}>{driverValidation.surname && driverValidation.surname} {emptyFields.surname && emptyFields.surname}</p>
        </div>
        <div className={style.containerInputs}>
            <label htmlFor="nationality"> NATIONALITY </label>
            <input type="text" name="nationality" value={createdDriver.nationality} onChange={handleForm} className={style.inputs}/>
            <p className={style.errors}>{driverValidation.nationality && driverValidation.nationality}{emptyFields.nationality && emptyFields.nationality}</p>
        </div>
        <div className={style.containerInputs}>
            <label htmlFor="image"> IMAGE </label>
            <input type="text" name="image" value={createdDriver.image} onChange={handleForm} className={style.inputs}/>
            <p className={style.errors}>{driverValidation.image && driverValidation.image}</p>
        </div>
        <div className={style.containerInputs}>
            <label htmlFor="dob"> DOB </label>
            <input type="text" name="dob" value={createdDriver.dob} onChange={handleForm} className={style.inputs}/>
            <p className={style.errors}>{driverValidation.dob && driverValidation.dob} {emptyFields.dob && emptyFields.dob}</p>
        </div>
        <div className={style.containerInputs}>
            <label htmlFor="description"> DESCRIPTION </label>
            <input type="text" name="description" value={createdDriver.description} onChange={handleForm} className={style.description}/>
            <p className={style.errors}>{driverValidation.description && driverValidation.description}</p>
        </div>
        </div>
        <div className={style.containerInputs}>
            <label htmlFor="teams" >CHOOSE HIS TEAMS</label>
            <p className={style.errors}>{driverValidation.teams && driverValidation.teams}</p>
            <div className={style.teams}> {teams.map((team) => (
            <label key={team.id} >
            <input type="checkbox" value={team.id}
            onChange={handleTeamSelection}/>
            {team.name}</label>
    ))}
  </div>
  </div>
        <div className={style.containerButtons}>
        <p className={style.error}> {showError && showError}</p>
        {createdSuccesfully && 
        <button className={style.button} onClick={handleClick}>BACK TO HOME</button>}
        <button type="submit"  className={style.button}>CREATE</button>
        </div>
      </form>
             </div>
        </div>
    </div>
)

}