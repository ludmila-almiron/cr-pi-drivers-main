export const errors_empty_fields = (driver) => {
    const errors_empty ={}
    if(!driver.name){
        errors_empty.name = "This field can't be empty"
    }
    if(!driver.surname){
        errors_empty.surname = "This field can't be empty"
    }
    if(!driver.nationality){
        errors_empty.nationality = "This field can't be empty"
    }
    if(!driver.dob){
        errors_empty.dob = "This field can't be empty"
    }
    return errors_empty
}