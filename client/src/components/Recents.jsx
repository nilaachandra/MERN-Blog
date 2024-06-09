import React from 'react'
import BlogCard from './BlogCard'

const Recents = () => {
  return (
    <div id='recents' className='grid lg:grid-cols-3 grid-col-1 gap-3 my-4'>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>

    
    </div>
  )
}

export default Recents