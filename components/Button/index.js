import React from "react"

import { Button_Types } from "constants/index"

const buttonTypes = {
    [Button_Types.primary]: "bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded",
    [Button_Types.ctaInverse]: "bg-transparent hover:bg-blue-400 text-blue-400 font-medium hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded",
}

const Button = ({ className = "", type = "primary", onClick, name }) => {

    return <button className={`${buttonTypes[type]} ${className}`} onClick={onClick}>{name}</button>

}

export default Button
