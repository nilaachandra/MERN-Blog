import React from 'react'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
const {logout} = useAuth()  
  return (
    <div className='w-full p-4'>
      <Button onClick={logout}>
        logout
      </Button>
    </div>
  )
}

export default Profile