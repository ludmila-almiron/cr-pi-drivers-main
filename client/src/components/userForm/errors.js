export const validations = (user) =>{
    const errors = {}
const regex = /\w+@(gmail|hotmail|outlook|live)\.com(\.\w{2,3})*$/
if(user.email){
    if (!regex.test(user.email)) {
        errors.email = "Debe ingresar un email válido"
        if (user.email.length > 35) {
            errors.email = "El email tiene demasiados caracteres";
          }
          if (!user.email) {
            errors.email = "El campo no puede estar vacío";
          } 
    
    } 
    if(regex.test(user.email))
    {(errors.email = "")}
}

if(user.password){
    if (user.password && (user.password.length < 6 || user.password.length > 10)) {
        errors.password = "La contraseña debe tener entre 6 y 10 caracteres";
    
    } 
    
    if (user.password && (user.password.length < 6 || user.password.length > 10)) {
        errors.password = "La contraseña debe tener entre 6 y 10 caracteres";
    } else {
        if(!/\d/.test(user.password)){
            errors.password = "La contraseña debe tener al menos un número"
        } else {
            errors.password = "";
        }
    }
}

return errors
}