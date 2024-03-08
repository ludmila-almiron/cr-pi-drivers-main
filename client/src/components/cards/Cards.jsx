import { useState, useEffect } from 'react';
import { Pagination } from '../pagination/Pagination'
import { useDispatch } from "react-redux";
import { saveDrivers, filterDrivers, getTeams, filterDriversByTeam, filterDriversDb_By_Team, filterDrivers_Api_By_Team } from '../../redux/actions';
import { useSelector } from 'react-redux';
import style from './Cards.module.css'
export const Cards = () => {
const dispatch = useDispatch()
const [drivers, setDrivers] = useState([]);
const [teams, setTeams] = useState([])
const allDrivers = useSelector(state => state.filteredDrivers);
const allTeams = useSelector(state => state.teams)
const error = useSelector(state => state.errors)

const handleTeamFilter = ({target}) => {
if(filterDb){
    dispatch(filterDriversDb_By_Team(target.value))
}
if(filterApi){
    dispatch(filterDrivers_Api_By_Team(target.value))
}

if(!filterApi && !filterDb){
dispatch(filterDriversByTeam(target.value))
}
}

const handleFilters = ({target}) =>{
    dispatch(filterDrivers(target.value))
}
useEffect(() =>{
    dispatch(saveDrivers())
    dispatch(getTeams())
    }, [])

useEffect(()=>{
    setDrivers(allDrivers)
    }, [allDrivers])

useEffect(()=>{
    setTeams(allTeams)
    }, [allTeams])

const[filterDb, setFilterDb] = useState(false)
const[filterApi, setFilterApi] = useState(false)

const handleFiltersDbApi = ({target}) =>{
dispatch(filterDrivers(target.value))

if(target.value === "Created by me"){
setFilterDb(true)
setFilterApi(false)
}
if(target.value === "Original drivers" ){
    setFilterApi(true)
    setFilterDb(false)
}
if(target.value === "All"){
    setFilterApi(false)
    setFilterDb(false)
}
}

console.log(filterApi)
console.log(filterDb)
return (
        <div className={style.containerDrivers}>
            <Pagination drivers={drivers} error={error}/>
            <div>
                {drivers.length > 0 && 
                <select onChange={handleTeamFilter}>
                <optgroup label="Filtros">Filter by team</optgroup>
                <option value="All">All</option>
                {teams.map((team) =>
                <option value={team.name} key={team.id}>{team.name}</option>
                )}
            </select>
                }
                {drivers.length > 0 && <span> Filter by team</span>}

              </div>
                <div>
                    {drivers.length > 0 && 
                    <select onChange={handleFiltersDbApi}>
                    <option value="All">All</option>
                    <option value="Created by me">Created By Me</option>
                    <option value="Original drivers">Original Drivers</option>
                </select>}
                    {drivers.length > 0 && <span> Filter created drivers</span>}
                </div>
                
                <div> {drivers.length >0 &&
                 <select onChange={handleFilters}>
                 <option value="Any">Any</option>
                 <option value="Alphabetically Ascendant">Order Alphabetically ⬆ </option>
                 <option value="Alphabetically Descendant">Order Alphabetically ⬇ </option>
                 <option value="Order By Dob Ascendant">Order By Dob ⬆ </option>
                 <option value="Order By Dob Descendant">Order By Dob ⬇ </option>
             </select>}
             {drivers.length > 0 && <span> Order by name or by dob</span>}
             </div>
            
        </div>
    );
}

