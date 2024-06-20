import React from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'

const Loader = () => {
    const {light} = useGlobalContext()
  return (
    <div className={`${light ? 'loader-lightmode' : 'loader-darkmode'}`}></div>
  )
}

export default Loader