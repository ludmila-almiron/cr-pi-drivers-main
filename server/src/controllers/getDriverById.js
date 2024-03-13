const axios = require('axios');
const {Driver} = require('../db')
const {Team} = require('../db')

const API_URL = 'http://localhost:5000/drivers'

const getDriverById = async (id) => {
    try {
        if(id < 508){
        const response = await axios.get(API_URL);
        const drivers = response.data;
        let driver = drivers.find(driver => driver.id == id);
        driver = {
            ...driver,
            name: driver.name.forename,
            surname: driver.name.surname,
            teams: driver.teams ? driver.teams.split(',').map((team) => team.trim()) : '',
            image: driver.image.url ? driver.image.url: 'https://tse4.mm.bing.net/th?id=OIP.EDPv_VX7fYKJSCMBCzqqnQEsDS&pid=Api&P=0&h=180' }
            return driver;
        }
        else{
            let driver = await Driver.findByPk(id, {
                include: {
                    model: Team,
                    as: "teams",
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });
            
            driver = {
                ...driver.toJSON(),
                teams: driver.teams.map((team) => team.name),
                image: driver.image ? driver.image : 'https://tse4.mm.bing.net/th?id=OIP.EDPv_VX7fYKJSCMBCzqqnQEsDS&pid=Api&P=0&h=180'

            };
            return driver;
        }
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = getDriverById;