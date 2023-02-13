import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../../Components/UIElements/Image'
import './SearchResultUser.css'
function SearchResultUser({error,user}) {
  if(error){
    return <div className='errorMsg'>{error}</div>
  }
  
  return (
    <div className="userList">
      {user.map(u => (
        <Link className="userItem link" to={`/user/${u.id}`} key={u.id}>
          <Image className="user-img" src={u.image} />
          <div className='info'>
            <p>{u.username}</p>
            <p>{u.about.substring(0,100)}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SearchResultUser