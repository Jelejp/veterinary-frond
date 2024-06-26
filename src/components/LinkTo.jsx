import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const LinkTo = ({anchor}) => {
    const location = useLocation()
    const isActive = (linkToCheck) => {
        return location.pathname === linkToCheck;
    };

    return (
        <Link to={props.to} className={"w-full flex flex-col justify-center items-center text-white font-bold scale-105  " + (props.className || '')}>
             <img src={isActive ? props.activeIcon : props.img} alt={props.text} className='w-7 md:w-10 lg:w-10' />
            <p className='text-xs md:text-base lg:text-base'> {props.text}</p>
        </Link>
    )
}

export default LinkTo
