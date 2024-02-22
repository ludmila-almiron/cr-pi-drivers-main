const axios = require('axios')
const {Driver} = require('../db')

const API_URL = 'http://localhost:5000/drivers'

const getAllDrivers = async (name) => {
    try {
        const response = await axios.get(API_URL);
        let drivers = response.data;
        if(name){
            let driversByName = await drivers.filter(driver => driver.name.forename === name)
            let driversDb = await Driver.findAll({
                where: {name: name}
            })
            driversByName = driversByName.concat(driversDb)
        if(driversByName.length !== 0){
            return driversByName = driversByName.splice(0,15)
        } else{
            throw new Error('No existen drivers con ese nombre')
        }
    }
    else {
        drivers = await drivers.map(driver=>({
            ...driver,
            image: driver.image.url ? driver.image.url: '../../../client/images/driverWithoutImage.jpg'
        }))
        return drivers
    }
}
catch(error){ return {error: error.message}
}
}


module.exports = getAllDrivers