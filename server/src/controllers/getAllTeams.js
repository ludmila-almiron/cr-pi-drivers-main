const axios = require('axios')
const { DataTypes } = require('sequelize');
const {Team} = require('../db')

const API_URL = 'http://localhost:5000/drivers'

const getAllTeams = async () => {
    const { data } = await axios.get(API_URL);
    let teamsData = data.map(driver => driver.teams);
    teamsData = teamsData.join(',').split(',')
    teamsData = teamsData.map(team => team.trim())
    let teams = [...new Set(teamsData)]
    teams = teams.filter((team) => team !== "")

    teams.sort((a, b) => {
        const nameA = a.toLowerCase();
        const nameB = b.toLowerCase();
        return nameA.localeCompare(nameB);
    })
    
    try {
        const existingTeams = await Team.findAll();
        if (existingTeams.length > 0) {
            return existingTeams;
        }
    } catch(error){
        return{error: error.message}
    }

    for(let i = 0; i<teams.length; i++){
        try{
            await Team.create({
                name: teams[i]
            })
        }
        catch(error){
            return{error: error.message}
        }
    }
    const teamsDb = await Team.findAll()

    return teamsDb
}



module.exports = getAllTeams;