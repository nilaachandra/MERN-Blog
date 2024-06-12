import React from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'

const Button = ({className, onClick, type, children}) => {
const {light} = useGlobalContext()
    const classes = `flex justify-center ${light ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text"} font-bold items-center ouline-none py-2 px-4 rounded-sm ${className || ""}`

  return (
    <button className={classes} type={type} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button