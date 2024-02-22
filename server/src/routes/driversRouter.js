const express = require('express')
const getAllDrivers = require('../controllers/getAllDrivers')
const getDriverById = require('../controllers/getDriverById');
const createDriver = require('../controllers/createDriver');
const router = express.Router();


router.get('/', async (req, res) =>{
    let {name} = req.query
    try {
        if(name){
            name = name[0].toUpperCase() +name.substring(1, name.length).toLowerCase() 
            const driversByName = await getAllDrivers(name)
            return res.status(200).json(driversByName)
        } else {
           const drivers = await getAllDrivers()
           return res.status(200).json(drivers)
        }
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
})

router.get('/:idDriver', async (req, res) =>{
    const {idDriver} = req.params
    try {
const driver = await getDriverById(idDriver)
return res.status(200).json(driver)

    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
})

router.post('/', async(req, res) =>{
const {name, surname, description, image, nationality, dob, teams} = req.body
//VALIDAR DATOS!

try{
    const newDriver = await createDriver({name, surname, description, image, nationality, dob, teams})
    return res.status(200).json(newDriver)
}
catch(error){
    return res.status(400).json({error: error.message})
}
})


module.exports = router;