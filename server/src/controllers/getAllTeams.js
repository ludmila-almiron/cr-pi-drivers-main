const axios = require('axios')


const API_URL = 'http://localhost:5000/drivers'

const getAllTeams = async () => {
    const { data } = await axios.get(API_URL);
    let teamsData = data.map(driver => driver.teams);
    teamsData = teamsData.join(',').split(',')
    teamsData = teamsData.map(team => team.trim())
    const teams = [...new Set(teamsData)]
    return teams
}



module.exports = getAllTeams;