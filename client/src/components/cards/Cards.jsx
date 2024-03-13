import { useState, useEffect } from 'react';
import { Pagination } from '../pagination/Pagination'
import { useDispatch } from "react-redux";
import { saveDrivers, filterDrivers, getTeams, filterDriversByTeam, filterDriversDb_By_Team, filterDrivers_Api_By_Team, currentFilters } from '../../redux/actions';
import { useSelector } from 'react-redux';
import style from './Cards.module.css'


export const Cards = () => {
const dispatch = useDispatch()

useEffect(()=>{
    if(detail === false){
        dispatch(saveDrivers())
        dispatch(getTeams())
    }
    if(detail && currentFilters_state.teams !== "All"){
        setFilterTeams(true)
        const target = {value: currentFilters_state.teams}
        handleTeamFilter({ target })
    }
    if(detail && currentFilters_state.origin !== "All"){
        const target = {value: currentFilters_state.origin}
        handleFiltersDbApi({target})
    }
    
    }, [])

const [drivers, setDrivers] = useState([]);
const [teams, setTeams] = useState([])
const[filterDb, setFilterDb] = useState(false)
const[filterApi, setFilterApi] = useState(false)
const [filterTeams, setFilterTeams] = useState(false)
const[currentTeam, setCurrentTeam] = useState("")

const renderizedDrivers = useSelector(state => state.filteredDrivers);
const allTeams = useSelector(state => state.teams)
const error = useSelector(state => state.errors)
const detail = useSelector(state => state.detail)
const currentFilters_state = useSelector(state => state.currentFilters)

const handleTeamFilter = ({target}) => {
setFilterTeams(true)
setCurrentTeam(target.value)
dispatch(currentFilters({ teams: target.value }))

if(filterDb){
    dispatch(filterDriversDb_By_Team(target.value))
}

if(filterApi){
    dispatch(filterDrivers_Api_By_Team(target.value))
}

if(!filterApi && !filterDb && currentFilters_state.origin === "All"){
dispatch(filterDriversByTeam(target.value))
}
}

const handleOrder = ({target}) =>{
    dispatch(filterDrivers(target.value))
}

const handleFiltersDbApi = ({target}) =>{

dispatch(currentFilters({origin: target.value}))

if(!filterTeams && currentFilters_state.teams === "All"){
dispatch(filterDrivers(target.value))
}

if(target.value === "Created by me" && filterTeams){
setFilterDb(true)
setFilterApi(false)
dispatch(filterDriversDb_By_Team(currentTeam))
}
if(target.value === "Original drivers" && filterTeams){
    setFilterApi(true)
    setFilterDb(false)
dispatch(filterDrivers_Api_By_Team(currentTeam))
}

if(target.value === "All" && filterTeams){
    setFilterApi(false)
    setFilterDb(false)
    dispatch(filterDriversByTeam(currentTeam))
}
}

useEffect(()=>{
    setDrivers(renderizedDrivers)
    }, [renderizedDrivers])

useEffect(()=>{
    setTeams(allTeams)
    }, [allTeams])



console.log(filterTeams)

return (
        <div className={style.containerDrivers}>
            <div className={style.containerAllFilters}> 
                {drivers.length > 0 && 
                <select onChange={handleTeamFilter}>
                <option value="All">FILTER BY TEAM</option>
                <option value="All">All</option>
                {teams.map((team) =>
                <option value={team.name} key={team.id}>{team.name}</option>
                )}
            </select>
                }
                    {drivers.length > 0 && 
                    <select onChange={handleFiltersDbApi}>
                    <option value="All">FILTER BY ORIGIN</option>
                    <option value="All">All</option>
                    <option value="Created by me">Created By Me</option>
                    <option value="Original drivers">Original Drivers</option>
                </select>}
                {drivers.length >0 &&
                 <select onChange={handleOrder}>
                <option value="Any">ORDER</option>
                 <option value="Any">Any</option>
                 <option value="Alphabetically Ascendant">Order Alphabetically ⬆ </option>
                 <option value="Alphabetically Descendant">Order Alphabetically ⬇ </option>
                 <option value="Order By Dob Ascendant">Order By Dob ⬆ </option>
                 <option value="Order By Dob Descendant">Order By Dob ⬇ </option>
             </select>}
            </div>
            <Pagination drivers={drivers} error={error}/>
        </div>
    );
}