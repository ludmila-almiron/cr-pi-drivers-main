import { useNavigate } from 'react-router-dom'
import style from './ErrorInSearchDriver.module.css'

export const ErrorInSearchDriver = ({error, handleClick}) => {
    const navigate = useNavigate()
    const handleClickCreate = () =>{
        navigate('/create')
    }

    return(
        <div className={style.container}>
            <h2>{error}</h2>
            <button onClick={handleClick} value="No">No</button>
            <button value="Create" onClick={handleClickCreate}>Yes</button>
        </div>
    )
}