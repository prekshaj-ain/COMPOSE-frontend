import React from 'react'
import { Link } from 'react-router-dom';
import Image from './Image';
import './Search.css'
function Search({data,className,onClick}) {
  return (
      <div className={className} onClick={onClick}>
        {
            (data.hasOwnProperty('userData') && data.userData.length > 0) &&
            (<div className='search--users'>
                <h5>PEOPLE</h5>
                <hr />
                {data.userData.map(user => (
                    <Link to={`/user/${user._id}`} key={user._id} className="search--user">
                        <Image src={user.image} alt={user.username} className="userImg"/>
                        <p>{user.username}</p>
                    </Link>   
                ))}
            </div>)
        }
        {
            (data.hasOwnProperty('postData') && data.postData.length > 0) &&
            (<div className='search--posts'>
                <h5>BLOGS</h5>
                <hr />
                {data.postData.map(post => (
                    <Link to={`/post/${post._id}`} key={post._id} className="search--post">
                        <p>{post.title}</p>
                    </Link>   
                ))}
            </div>)
        }
        
    </div>
  )
}

export default Search