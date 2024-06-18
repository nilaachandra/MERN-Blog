import React from 'react'
import BlogCard from './BlogCard'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Link } from 'react-router-dom'

const Recents = () => {
  const {blogs,light, isLoading} = useGlobalContext()
  console.log(blogs)
  return (
    <div id='recents' className='grid lg:grid-cols-3 grid-col-1 gap-3 my-4'>
    {blogs?.map((item, index) => <Link to={`blogs/${item.category}/${item._id}/${item.title}`} key={index}>
      <BlogCard
    author={item.userDetails.firstName + " " + item.userDetails.lastName}
    category={item.category}
    image={item.image}
    title={item.title}
    postedAt={item.createdAt}
    />
    </Link>)}
    </div>
  )
}

export default Recents