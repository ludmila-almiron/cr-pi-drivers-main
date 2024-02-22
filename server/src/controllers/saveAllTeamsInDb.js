const getAllTeams = require('./getAllTeams');
const { Team } = require('../db');

const saveAllTeamsInDb = async () => {
    try {
    const teams = await getAllTeams()
    for(let i = 0; i<teams.length; i++){
        await Team.create({
            name: teams[i]
        })
    }
}
catch(error){
    return {error: error.message}
}
}