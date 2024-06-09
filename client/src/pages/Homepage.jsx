import React from 'react'
import Drawer from '../components/Drawer'
import Featured from '../components/Featured'
import Tabs from '../components/Tabs'

const Homepage = () => {
  return (
    <div className='w-full min-h-screen'>
      <Featured/>
      <Tabs/>
    </div>
  )
}

export default Homepage