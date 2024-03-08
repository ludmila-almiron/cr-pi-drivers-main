import {useState} from 'react'
import {validations} from './errors'
import { useDispatch } from 'react-redux'
import { loginUsers } from '../../redux/actions'
import style from './UserForm.module.css'

export const UserForm = ({signUpUser}) => {
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
        ...user,
        [target.name]: target.value
    }))
}
const [login, setLogin] = useState(false)

const handleSubmit = (event) => {
    event.preventDefault()
    if(!errors.email && !errors.password && user.email && user.password){
    dispatch(loginUsers(user))
    setUser({
        email:"",
        password: ""
    })
    setLogin(true)
    signUpUser()}
}
console.log(user)

return(
        <div className={style.container}>
        {!login && 
        <form onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
            <label htmlFor="email" className={style.email}> EMAIL: </label>
            <input type="text" name="email" value={user.email} onChange={handleForm} className={style.inputEmail}/>
            <div className={style.errors}> {errors.email && errors.email}</div>
            <label htmlFor="password" className={style.password}> PASSWORD: </label>
        <input type="text" name="password" value={user.password} onChange={handleForm} className={style.inputPassword}/>
        <div className={style.errors}>{errors.password && errors.password}</div>
        <button type="login" >LOGIN</button>
        </div>
      </form>
        }
        </div>
    )
}
        