const axios = require('axios');
const {Driver} = require('../db')
const {Team} = require('../db')

const API_URL = 'http://localhost:5000/drivers'

const getDriverById = async (id) => {
    try {
        if(id < 508){
        const response = await axios.get(API_URL);
        const drivers = response.data;
        const driver = drivers.find(driver => driver.id == id);
        return driver;
        }
        else{
            const driver = Driver.findByPk(id, {
                include: {
                    model: Team,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }

            })
                return driver;
        }
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = getDriverById;