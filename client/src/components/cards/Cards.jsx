import { useState, useEffect } from 'react';
import axios from 'axios';
import {Card} from '../card/Card';
import { Pagination } from '../pagination/Pagination'


export const Cards = () => {
    const [drivers, setDrivers] = useState([]);


    useEffect(() => {
        const getDrivers = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/drivers');
                setDrivers(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getDrivers();
    }, []);

    return (
        <div>
           <div>{drivers.map((driver, index) => (
                <Card driver={driver} key={index} />
            ))}</div>
            <div>
                <Pagination drivers={drivers}/>
            </div>
        </div>
    );
};