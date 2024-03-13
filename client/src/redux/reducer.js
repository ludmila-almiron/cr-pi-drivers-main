import { SAVE_DRIVERS, FILTER_DRIVERS_BY_TEAM, GET_TEAMS, SEARCH_DRIVER, CREATE_DRIVER, FILTER_DRIVERS, LOGIN_USERS, FILTER_DRIVERS_DB_BY_TEAM, FILTER_DRIVERS_API_BY_TEAM, SET_CURRENT_PAGE, FILTER_DRIVERS_COPY, CURRENT_FILTERS} from "./actions"

const initialState = {
    allDrivers: [],
    filteredDrivers: [],
    filteredDriversCopy: [],
    driversDb: [],
    driversApi: [],
    teams: [],
    errors: "",
    currentPage: 1,
    detail: false,
    currentFilters:{
        teams: "All",
        origin: "All",
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case SAVE_DRIVERS:
            return {
                ...state,
                allDrivers: [...action.payload],
                filteredDrivers: [...action.payload],
                filteredDriversCopy: [...action.payload],
                driversDb: [...action.payload.filter((driver)=>driver.id>508)],
                driversApi:[...action.payload.filter((driver)=>driver.id<509)],
                errors: "",
                currentPage: 1
            };

        case FILTER_DRIVERS_COPY:
            return{
                ...state,
                detail: true,
                filteredDriversCopy:[...state.filteredDrivers]
            }
   
        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload !== null ? action.payload : 1
            }
        
        case FILTER_DRIVERS:
            if(action.payload === 'Created by me' ){
                return{
                    ...state,
                    filteredDrivers:[...state.driversDb],
                    currentPage: 1
                }
            }

            if(action.payload === 'Original drivers'){
                return{
                    ...state,
                    filteredDrivers:[...state.driversApi]
                }
            }

            if(action.payload === 'Alphabetically Ascendant'){
                return{
                    ...state,
                    filteredDrivers: [...state.filteredDrivers.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    })]
                }
            }

            if(action.payload === 'Alphabetically Descendant'){
                return{
                    ...state,
                    filteredDrivers:[...state.filteredDrivers.sort((a, b) => {
                        return b.name.localeCompare(a.name);
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
                    filteredDrivers:[...state.filteredDrivers.sort((a,b)=>{
                        return a.id - b.id
                    })]
                }
            }

        case FILTER_DRIVERS_BY_TEAM:
            if(action.payload === "All"){
                return {
                    ...state,
                    currentPage: 1,
                    filteredDrivers:[...state.allDrivers] 
                }
            }
            return{
                    ...state,
                    currentPage: 1,
                    filteredDrivers:[...state.allDrivers.filter(
                        driver => driver.teams.includes(action.payload))]
                }
            
        case GET_TEAMS:
            return {
                ...state,
                teams: [...action.payload]
            }
        
        case SEARCH_DRIVER:
            if(!Array.isArray(action.payload)){
            return{
                ...state,
                filteredDrivers: [],
                errors: action.payload,
                currentPage: 1

            }
            }else{
                return{
                    ...state,
                    filteredDrivers: [...action.payload],
                    currentPage: 1
                }
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

        case FILTER_DRIVERS_DB_BY_TEAM:
            if(action.payload === "All"){
                return {
                    ...state,
                    filteredDrivers:[...state.driversDb] 
                }
            }
            return{
                ...state,
                filteredDrivers:[...state.driversDb.filter(
                    driver => driver.teams.includes(action.payload))]
            }

        case FILTER_DRIVERS_API_BY_TEAM:
            if(action.payload === "All"){
                return {
                    ...state,
                    filteredDrivers:[...state.driversApi] 
                }
            }
            return{
                ...state,
                filteredDrivers:[...state.driversApi.filter(
                    driver => driver.teams.includes(action.payload))]
            }

        case CURRENT_FILTERS:
            return{
                ...state,
                currentFilters: {...state.currentFilters, ...action.payload}
            }
    
    default:
    return { ...state };
};

}

export default rootReducer
