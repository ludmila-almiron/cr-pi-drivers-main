import { useState } from "react"
import { UserForm } from "../userForm/UserForm"

export const SignIn_SignUp = ({signUpUser}) =>{
const [signUp, setSignUp] = useState(false)
const [login, setLogin] = useState(true)
const [buttons, setButtons] = useState(true)

const handleSignUp = () =>{
setSignUp(true)
setButtons(false)
}
const handleLogin = () => {
setLogin(true)
setButtons(false)
}

    return(
        <div>
            {buttons && 
            <div>
                <button onClick={handleSignUp}>SIGN UP</button>
                <button onClick={handleLogin}>LOGIN</button>
            </div>}
         {signUp && 
         <div> <UserForm signUpUser={signUpUser}/></div>}
         
        </div>
    )
}