import axios from 'axios';
export const SAVE_DRIVERS = 'SAVE_DRIVERS'
export const FILTER_DRIVERS_BY_TEAM = 'FILTER_DRIVERS_BY_TEAM'
export const GET_TEAMS = 'GET_TEAMS'
export const SEARCH_DRIVER = 'SEARCH_DRIVER'
export const CREATE_DRIVER = 'CREATE_DRIVER'
export const FILTER_DRIVERS = 'FILTER_DRIVERS'
export const LOGIN_USERS = 'LOGIN_USERS'
export const FILTER_DRIVERS_DB_BY_TEAM = 'FILTER_DRIVERS_DB_BY_TEAM'
export const FILTER_DRIVERS_API_BY_TEAM = 'FILTER_DRIVERS_API_BY_TEAM'

export const saveDrivers = () => {
    return async (dispatch) => {
  try{
const {data} = await axios.get('http://localhost:3001/drivers')
dispatch({
    type: SAVE_DRIVERS,
    payload: data
})
  }
  catch(error){
dispatch({
    type: SAVE_DRIVERS,
    payload: error.message
})
  }
    }
}

export const filterDrivers = (filter) => {
return {
    type: FILTER_DRIVERS,
    payload: filter
}
}

export const filterDriversByTeam = (filter) =>{
    return {
        type: FILTER_DRIVERS_BY_TEAM,
        payload: filter
    }
}

export const getTeams = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('http://localhost:3001/team')
            dispatch({
                type: GET_TEAMS,
                payload: data
            })
        }
        catch(error){
            return async (dispatch) =>{
                dispatch({
                    type: GET_TEAMS,
                    payload: error.message
                })
            }
        }
    }
}

export const searchDriver = (name) =>{
    return async (dispatch) =>{
        try{
            const {data} = await axios.get(`http://localhost:3001/drivers?name=${name}`)
                dispatch({
                    type: SEARCH_DRIVER,
                    payload: data
                })
        }
        catch(error) {
            dispatch({
                type: SEARCH_DRIVER,
                payload: error
            })
        }
    }
   
}
export const createDriver = (driver) => {
    return {
        type: CREATE_DRIVER,
        payload: driver
    }
}

export const loginUsers = (user) =>{
    return{
        type: LOGIN_USERS,
        payload: user
    }
}

export const filterDriversDb_By_Team = (filter) =>{
    return{
        type: FILTER_DRIVERS_DB_BY_TEAM,
        payload: filter
    }
}

export const filterDrivers_Api_By_Team = (filter)=>{
    return{
        type: FILTER_DRIVERS_API_BY_TEAM,
        payload: filter
    }
}





