const axios = require('axios')
const {Driver} = require('../db')
const {Team} = require('../db')

const API_URL = 'http://localhost:5000/drivers'

const getAllDrivers = async (name) => {
    try {
        const {data} = await axios.get(API_URL);
    let drivers = data
    drivers = await drivers.map(driver=>({
        ...driver,
        name: driver.name.forename,
        surname: driver.name.surname,
        teams: driver.teams ? driver.teams.split(',').map((team) => team.trim()) : '',
        image: driver.image.url ? 
        driver.image.url: 'https://tse4.mm.bing.net/th?id=OIP.EDPv_VX7fYKJSCMBCzqqnQEsDS&pid=Api&P=0&h=180'
    }))
        if(name){
            let driversByName = await drivers.filter(driver => driver.name === name)
            let driversDb = await Driver.findAll({
                where: {
                    name: name
                },
                include: [{
                    model: Team,
                    as: "teams",
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }]
            });
            driversDb = driversDb.map((driver)=>{
                return{
                    ...driver.toJSON(),
                    teams: driver.teams.map((team)=>team.name)
                }
            })
            driversByName = driversByName.concat(driversDb)
            if(driversByName.length !== 0){
                return driversByName = driversByName.splice(0,15)
            } else{
                throw new Error('There are no drivers matching that name. ¿Do you want to create it?')
            }
    }
    else {
        let driversDb = await Driver.findAll({
            include: {
                model: Team,
                as: "teams",
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
       driversDb = driversDb.map((driver)=>{
            return{
                ...driver.toJSON(),
                teams: driver.teams.map((team)=>team.name)
            }
        })
        return drivers.concat(driversDb);
       
    }
}
catch(error){ return {error: error.message}
}
}


module.exports = getAllDrivers