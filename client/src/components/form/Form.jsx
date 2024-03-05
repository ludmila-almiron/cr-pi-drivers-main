import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from 'axios'
import { createDriver, getTeams } from "../../redux/actions";
import { validations } from "./errors";
import { useSelector } from 'react-redux';
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

useEffect(()=>{
    dispatch(getTeams())
}, [])

const[selectedTeams, setSelectedTeams] = useState([])
 
const handleSubmit = (event) => {
    event.preventDefault()
    if(driverValidation === ""){

    }
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
}
return (
    <div>
        <h1>Crea tu propio Driver!</h1>
        <form onSubmit={handleSubmit} >
        <div>
            <label htmlFor="name"> Nombre: </label>
            <input type="text" name="name" value={createdDriver.name} onChange={handleForm}/>
            <p>{driverValidation.name && driverValidation.name}</p>
        </div>
        <div>
            <label htmlFor="surname"> Apellido: </label>
            <input type="text" name="surname" value={createdDriver.surname} onChange={handleForm}/>
            <p>{driverValidation.surname && driverValidation.surname}</p>
        </div>
        <div>
            <label htmlFor="nationality"> Nacionalidad: </label>
            <input type="text" name="nationality" value={createdDriver.nationality} onChange={handleForm}/>
            <p>{driverValidation.nationality && driverValidation.nationality}</p>
        </div>
        <div>
            <label htmlFor="image"> Imagen: </label>
            <input type="text" name="image" value={createdDriver.image} onChange={handleForm}/>
            <p>{driverValidation.image && driverValidation.image}</p>
        </div>
        <div>
            <label htmlFor="dob"> Fecha de Nacimiento: </label>
            <input type="text" name="dob" value={createdDriver.dob} onChange={handleForm}/>
            <p>{driverValidation.dob && driverValidation.dob}</p>
        </div>
        <div>
            <label htmlFor="description"> Descripción: </label>
            <input type="text" name="description" value={createdDriver.description} onChange={handleForm}/>
            <p>{driverValidation.description && driverValidation.description}</p>
        </div>
        <div>
        <label htmlFor="teams">Teams:</label>
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
        <div>
            <button type="submit" >CREATE</button>
        </div>
      </form>
    </div>
)
}