export const validations = (driver) => {
    const errors = {}
    const regexNumbers = /\d/
    const regexSymbols = /^[a-zA-Z0-9\s]*$/
    
    if(driver.name){
        if(!regexSymbols.test(driver.name)){
            errors.name = "The name can't contain symbols"
        }
        if(driver.name.length > 50){
            errors.name = "The name has too many characters"
        }
        if(regexNumbers.test(driver.name)){
            errors.name = "The name can't contain numbers"
        }
    }

    if(driver.surname){
        if(!regexSymbols.test(driver.surname)){
            errors.surname = "The surname can't contain symbols"
        }
        if(driver.surname.length > 50){
            errors.surname = "The surname has too many characters"
        }
        if(regexNumbers.test(driver.surname)){
            errors.surname = "The surname can't contain numbers"
        }
    }

    if(driver.nationality){
        if(!regexSymbols.test(driver.nationality)){
            errors.nationality = "The nationality can't contain symbols"
        }
        if(driver.nationality.length > 50){
            errors.nationality = "Too many characters"
        }
        if(regexNumbers.test(driver.nationality)){
            errors.nationality = "Tha nationality can't contain numbers"
        }
    }


    if(driver.dob){
        const regexDob = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
        if(! regexDob.test(driver.dob)){
        errors.dob = "The date of birth must be written in 'YYYY-MM-DD' format"
}
    }

    if(driver.description){
        if(driver.description.length > 500){
            errors.description = "Too many characters"
        }
    }

    if (driver.teams.length === 0) {
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