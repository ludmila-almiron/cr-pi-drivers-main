import { SAVE_DRIVERS, FILTER_DRIVERS_BY_TEAM, GET_TEAMS, SEARCH_DRIVER, CREATE_DRIVER, FILTER_DRIVERS, LOGIN_USERS } from "./actions"



const initialState = {
    allDrivers: [],
    filteredDrivers: [],
    teams: [],
    users: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case SAVE_DRIVERS:
            return {
                ...state,
                allDrivers: [...action.payload], 
                filteredDrivers: [...action.payload]
            };
        
        case FILTER_DRIVERS:
            if(action.payload === 'Created by me' ){
                return{
                    ...state,
                    filteredDrivers:[...state.allDrivers.filter((driver)=>driver.id>508)]
                }

            }

            if(action.payload === 'Original drivers'){
                return{
                    ...state,
                    filteredDrivers:[...state.allDrivers.filter((driver)=>driver.id<509)]
                }
            }

            if(action.payload === 'Alphabetically Ascendant'){
                return{
                    ...state,
                    filteredDrivers:[...state.filteredDrivers.sort((a, b) => {
                        const nameA = a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        const nameB = b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        
                        if (nameA < nameB) {
                          return -1; 
                        }
                        if (nameA > nameB) {
                          return 1; 
                        }
                        
                        return 0; 
                      })]
                }
            }

            if(action.payload === 'Alphabetically Descendant'){
                return{
                    ...state,
                    filteredDrivers:[...state.filteredDrivers.sort((a, b) => {
                        const nameA = a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        const nameB = b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        if (nameB < nameA) {
                            return -1; 
                        }
                        if (nameB > nameA) {
                            return 1; 
                        } 
                        return 0; 
                      })]
                }
            }

            if(action.payload === 'Order By Dob Ascendant'){
                return{
                    ...state,
                    filteredDrivers:[...state.filteredDrivers.sort((a, b) => {
                        const dateA = new Date(a.dob);
                        const dateB = new Date(b.dob);
                        return dateA - dateB;
                      })]
                }
            }
            
            if(action.payload === 'Order By Dob Descendant'){
                return{
                    ...state,
                    filteredDrivers:[...state.filteredDrivers.sort((a, b) => {
                        const dateA = new Date(a.dob);
                        const dateB = new Date(b.dob);
                        return dateB - dateA;
                      })]
                }
            }
            if(action.payload === "Any"){
                return{
                    ...state,
                    filteredDrivers:[...state.allDrivers]
                }
            }

        case FILTER_DRIVERS_BY_TEAM:
            if(action.payload === "All"){
                return {
                    ...state,
                    filteredDrivers:[...state.allDrivers] 
                }
            }
            return{
                    ...state,
                    filteredDrivers:[...state.allDrivers.filter(
                        driver => driver.teams.includes(action.payload))]
                }
            
        case GET_TEAMS:
            return {
                ...state,
                teams: [...action.payload]
            }
        
        case SEARCH_DRIVER:
            return{
                ...state,
                filteredDrivers: [action.payload]
            }

        case CREATE_DRIVER:
            return{
                ...state,
                allDrivers:[...state.allDrivers, action.payload],
            }

        case LOGIN_USERS:
            return{
                ...state,
                users: [...state.users, action.payload]
            }
    default:
    return { ...state };
};

}

export default rootReducer
