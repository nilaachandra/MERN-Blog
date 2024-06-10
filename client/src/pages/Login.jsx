import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='w-full h-screen flex justify-center py-8'>
      <form action="" className='lg:w-1/2 flex flex-col gap-2 w-full h-[50vh] border p-3 border-red-500'>
      <h1 className='font-bold'>Login to Your Account</h1>
        <input type="text" className='border border-black rounded-sm p-2 w-full' placeholder='username'/>
        <input type="text" className='border border-black rounded-sm p-2 w-full' placeholder='password'/>
        <button className='border border-black p-2'>Log In</button>
        <h1>Don't Have an account? <Link to='/sign-up' className='underline'>Sign Up</Link></h1>
      </form>
    </div>
  )
}

export default Login