import React from 'react'
import BlogList from '../../Components/BlogList'
import './SearchResultBlog.css'
function SearchResultBlog({error,post}) {
    if(error){
        return <div className='errorMsg'>{error}</div>
    }
  return (
    <BlogList posts={post} userData={true}/>
  )
}

export default SearchResultBlog