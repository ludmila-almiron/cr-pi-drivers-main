export const validations = (driver) => {
    const errors = {}
    const regexNumbers = /\d/
    if(driver.name){
        if(driver.name.length > 50){
            errors.name = "El nombre no puede tener más de 50 caracteres"
        }
        if(regexNumbers.test(driver.name)){
            errors.name = "El nombre no puede contener numeros"
        }
    }

    if(driver.surname){
        if(driver.surname.length > 50){
            errors.surname = "El apellido no puede tener más de 50 caracteres"
        }
        if(regexNumbers.test(driver.surname)){
            errors.surname = "El apellido no puede contener numeros"
        }
    }

    if(driver.nationality){
        if(driver.nationality.length > 50){
            errors.nationality = "La nacionalidad no puede tener más de 50 caracteres"
        }
        if(regexNumbers.test(driver.nationality)){
            errors.nationality = "La nacionalidad no puede contener numeros"
        }
    }

    if(driver.dob){
        const regexDob = /^\d{4}-\d{2}-\d{2}$/
        if(! regexDob.test(driver.dob)){
        errors.dob = "La fecha de nacimiento debe escribirse en formato 'AAAA-MM-DD'"
}
    }

    if(driver.description){
        if(driver.description.length > 500){
            errors.description = "La descripción no puede tener más de 500 caracteres"
        }
    }

    if(driver.teams){
        const regexLeters = /[a-zA-Z]/
        if(regexLeters.test(driver.teams)){
            errors.teams = "Solo puede ingresar los ids de los teams separados por un espacio"
        }
        const regexComma = /,/
        if(regexComma.test(driver.teams)){
            errors.teams = "Los ids de los teams solo pueden estar separados por un espacio"
        }
    }

    if(driver.image){
        const regexImageUrl = /^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|png|gif)$/i
        if(! regexImageUrl.test(driver.image)){
errors.image = "Los únicos formatos válidos son jpg, jpeg, png o gif"
        }
    }

return errors
}