import React from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'
import './UserProfile.css'
function UserProfile(props) {
  return (
    <div className='UserProfile'>
        <Link className='link' to={`/user/${props.id}`}><Image className="user-img" src={props.image} /></Link>
        <Link className='link' to={`/user/${props.id}`}><p className='username'>{props.username}</p></Link>
        <p className='userDesc'>{props.about}</p>
    </div>
  )
}

export default UserProfile