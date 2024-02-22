const {Driver} = require('../db')
const {Team} = require('../db')
const createDriver = async ({name, surname, description, image, nationality, dob, teams}) =>{
    const newDriver = await Driver.create({
        name,
        surname,
        description,
        image,
        nationality,
        dob
    })
    newDriver.addTeams(teams)
    return newDriver;

    
}

module.exports = createDriver