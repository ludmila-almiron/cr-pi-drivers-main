import {useState} from 'react'
import {validations} from './errors'
import { useDispatch } from 'react-redux'
import { loginUsers } from '../../redux/actions'

export const UserForm = ({loginUser}) => {
const dispatch = useDispatch()
const [user, setUser] = useState({
    email: "",
    password: ""
})
const [errors, setErrors] = useState({
    email: "",
    password: ""
})

const handleForm = ({target}) =>{
    setUser({
        ...user,
        [target.name]: target.value
    })
    setErrors(validations({
        ...errors,
        [target.name]: target.value
    }))
}

const handleSubmit = (event) => {
    event.preventDefault()
    if(!errors.email && !errors.password){
    dispatch(loginUsers(user))
    loginUser()
    }

}

console.log(user)
    return(
        <div>
            <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email"> Email: </label>
            <input type="text" name="email" value={user.email} onChange={handleForm}/>
            <p> {errors.email && errors.email}</p> 
        </div>
        <div>
        <label htmlFor="password"> Password: </label>
        <input type="text" name="password" value={user.password} onChange={handleForm}/>
        <p>{errors.password && errors.password}</p> 
        </div>
        <div>
            <button type="login" >LOGIN</button>
        </div>
      </form>
        </div>
    )
}
        