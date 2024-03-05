const {Driver} = require('../db')
const {Team} = require('../db')
const createDriver = async ({name, surname, description, image, nationality, dob, teams}) =>{
    console.log(teams)
    let newDriver = await Driver.create({
        name,
        surname,
        description,
        image,
        nationality,
        dob
    })
   await newDriver.addTeam(teams)
   let newDriverWithTeams = await Driver.findByPk(newDriver.id, {
    include: {
        model: Team,
        as: "teams",
        attributes: ["name"],
        through: {
            attributes: []
        }
    }
});
newDriverWithTeams = {
    ...newDriverWithTeams.toJSON(),
    teams: newDriverWithTeams.teams.map((team)=>team.name)
}
    return newDriverWithTeams;
}

module.exports = createDriver