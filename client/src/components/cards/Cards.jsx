import { useState, useEffect } from 'react';
import { Pagination } from '../pagination/Pagination'
import { useDispatch } from "react-redux";
import { saveDrivers, filterDrivers, getTeams, filterDriversByTeam } from '../../redux/actions';
import { useSelector } from 'react-redux';

export const Cards = () => {
const dispatch = useDispatch()
const [drivers, setDrivers] = useState([]);
const [teams, setTeams] = useState([])
const allDrivers = useSelector(state => state.filteredDrivers);
const allTeams = useSelector(state => state.teams)
console.log(allDrivers)

const handleTeamFilter = ({target}) => {
dispatch(filterDriversByTeam(target.value))
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

return (
        <div>
            <div>
            <Pagination drivers={drivers}/>
            </div>
            <div>
            <select onChange={handleTeamFilter}>
                {teams.map((team) =>
                <option value={team.name} key={team.id}>{team.name}</option>
                )}
                <option value="All">All</option>
            </select>
            <select onChange={handleFilters}>
                <option value="All">All</option>
                <option value="Created by me">Created By Me</option>
                <option value="Original drivers">Original Drivers</option>
            </select>
            <select onChange={handleFilters}>
                <option value="Any">Any</option>
                <option value="Alphabetically Ascendant">Order Alphabetically ⬆ </option>
                <option value="Alphabetically Descendant">Order Alphabetically ⬇ </option>
                <option value="Order By Dob Ascendant">Order By Dob ⬆ </option>
                <option value="Order By Dob Descendant">Order By Dob ⬇ </option>
            </select>
            </div>
        </div>
    );
}

