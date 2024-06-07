import React from 'react'
import logo from '../assets/justanotherblog2.png'
const Logo = () => {
  return (
    <div className='flex gap-1 items-center'>
        <img src={logo} alt="" width={50} height={50}/>
        <h1 className='text-xl font-bold'>JustAnotherBlog</h1>
    </div>
  )
}

export default Logo