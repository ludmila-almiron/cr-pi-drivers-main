export const validations = (user) =>{
    const errors = {}
const regex = /\w+@(gmail|hotmail|outlook|live)\.com(\.\w{2,3})*$/

if(user.email){
if(regex.test(user.email))
    {(errors.email = "")}
if (!regex.test(user.email)) {
        errors.email = "You must enter a valid email"
        if (user.email.length > 35) {
            errors.email = "The email has too many characters";
          }
        }
} 

if (user.email.length === 0) {
    errors.email = "This field can't be empty";
  } 
   


if(user.password){
if (user.password && (user.password.length < 6 || user.password.length > 10)) {
        errors.password = "It must be between 6 and 10 characters";
    }  
if (user.password && (user.password.length < 6 || user.password.length > 10)) {
        errors.password = "It must contain at least one number";
    } 
if(user.password.length === 0){
        errors.password = "This field can't be empty";
    }
}


return errors
}

