import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios'
import { createDriver, getTeams, saveDrivers } from "../../redux/actions";
import { validations } from "./errors";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import style from "./Form.module.css"


export const Form =()=>{
const dispatch = useDispatch()
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
const[selectedTeams, setSelectedTeams] = useState([])
const[showError, setShowError] = useState("")
const[createdSuccesfully, setCreatedSuccesfully] = useState(false)

useEffect(()=>{
    dispatch(getTeams())
}, [])

 
const handleSubmit = (event) => {
    event.preventDefault()
   const validations = Object.values(driverValidation)
   if(validations.every(validations => ! validations)){
    const elements = event.target.elements

    let form = {}
        for (const element of elements){
            form[element.name]=element.value
            console.log(element.name)
            console.log(element.value)
        }
        form = {
            ...form,
            teams:[...selectedTeams]
        }
        console.log(form)
       axios.post('http://localhost:3001/drivers', form )
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

const handleForm = ({target}) => {
setCreatedDriver({
    ...createdDriver,
    [target.name]:target.value
})
setDriverValidation(validations({
    ...createdDriver,
    [target.name]:target.value
}))
}

const handleTeamSelection =  (id) => {
   if(selectedTeams.includes(id)){
    setSelectedTeams([...selectedTeams.filter((teamId)=> teamId !== id)])
   } else{
    setSelectedTeams([...selectedTeams, id])
   }
   setCreatedDriver({
    ...createdDriver,
    teams: [...selectedTeams]
   })
   setDriverValidation(validations({
    ...createdDriver,
    teams: [...selectedTeams]
   }))
}
return (
    <div>
        <h1>Create your own driver!</h1>
        <form onSubmit={handleSubmit} >
        <div>
            <label htmlFor="name"> Name: </label>
            <input type="text" name="name" value={createdDriver.name} onChange={handleForm}/>
            <p>{driverValidation.name && driverValidation.name}</p>
        </div>
        <div>
            <label htmlFor="surname"> Surname: </label>
            <input type="text" name="surname" value={createdDriver.surname} onChange={handleForm}/>
            <p>{driverValidation.surname && driverValidation.surname}</p>
        </div>
        <div>
            <label htmlFor="nationality"> Nationality: </label>
            <input type="text" name="nationality" value={createdDriver.nationality} onChange={handleForm}/>
            <p>{driverValidation.nationality && driverValidation.nationality}</p>
        </div>
        <div>
            <label htmlFor="image"> Image: </label>
            <input type="text" name="image" value={createdDriver.image} onChange={handleForm}/>
            <p>{driverValidation.image && driverValidation.image}</p>
        </div>
        <div>
            <label htmlFor="dob"> Dob: </label>
            <input type="text" name="dob" value={createdDriver.dob} onChange={handleForm}/>
            <p>{driverValidation.dob && driverValidation.dob}</p>
        </div>
        <div>
            <label htmlFor="description"> Description: </label>
            <input type="text" name="description" value={createdDriver.description} onChange={handleForm}/>
            <p>{driverValidation.description && driverValidation.description}</p>
        </div>
        <div>
        <label htmlFor="teams">Teams:</label>
        <p>{driverValidation.teams && driverValidation.teams}</p>
        <div>
    {teams.map((team) => (
      <label key={team.id}>
        <input
          type="checkbox"
          value={team.id}
          checked={selectedTeams.includes(team.id)}
          onChange={() => handleTeamSelection(team.id)}
          className={style.teamsButtons}
        />
        {team.name}
      </label>
    ))}
  </div>
        </div>
        <p> {showError && showError}</p>
        {createdSuccesfully && 
        <button><Link to="/home">Return to home</Link></button>}
        <div>
            <button type="submit" >CREATE</button>
        </div>
      </form>

    </div>
)
}