export const validations = (driver) => {
    const errors = {}
    const regexNumbers = /\d/
    
    if(driver.name){
        if(driver.name.length > 50){
            errors.name = "The name has too many characters"
        }
        if(regexNumbers.test(driver.name)){
            errors.name = "The name can't contain numbers"
        }
    }

    if(driver.name.length === 0){
        errors.name = "This field can't be empty"
    }

    if(driver.surname){
        if(driver.surname.length > 50){
            errors.surname = "The surname has too many characters"
        }
        if(regexNumbers.test(driver.surname)){
            errors.surname = "The surname can't contain numbers"
        }
    }

    if(driver.surname.length <1){
        errors.surname = "This field can't be empty"
    }

    if(driver.nationality){
        if(driver.nationality.length > 50){
            errors.nationality = "Too many characters"
        }
        if(regexNumbers.test(driver.nationality)){
            errors.nationality = "Tha nationality can't contain numbers"
        }
    }

    if(driver.dob){
        const regexDob = /^\d{4}-\d{2}-\d{2}$/
        if(! regexDob.test(driver.dob)){
        errors.dob = "The date of birth must be written in 'YYYY-MM-DD' format"
}
    }

    if(driver.dob.length === 0){
        errors.dob = "This field can't be empty"
    }

    if(driver.description){
        if(driver.description.length > 500){
            errors.description = "Too many characters"
        }
    }
    if (!driver.teams) {
        errors.teams = "The driver must have at list one team";
    }
    
    if(driver.image){
        const regexImageUrl = /^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|png|gif)$/i
        if(! regexImageUrl.test(driver.image)){
errors.image = "The only valid formats are jpg, jpeg, png or gif"
        }
    }

return errors
}