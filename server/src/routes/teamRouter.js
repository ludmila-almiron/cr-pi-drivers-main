const { Router } = require("express");
const getAllTeams = require("../controllers/getAllTeams");
const saveAllTeamsInDb = require("../controllers/saveAllTeamsInDb");

const router = Router();

router.get('/', async (req, res) => {
  try {
    const teams = await getAllTeams()
    return res.status(200).json(teams)
  }
  catch(error){
    return res.status(400).json({error: error.message})
  }
  })

  router.post('/prueba', async(req, res) =>{
    const {name} = req.body
    try{
      const team = await saveAllTeamsInDb(name)
      return res.status(200).json(team)
    }
    catch(error){
      return res.status(400).json({error: error.message})
    }
  })


module.exports = router;