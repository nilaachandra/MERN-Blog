import React from 'react'
import Drawer from '../components/Drawer'
import Featured from '../components/Featured'

const Homepage = () => {
  return (
    <div className='w-full h-screen'>
      <Featured/>
      <Drawer/>
    </div>
  )
}

export default Homepage