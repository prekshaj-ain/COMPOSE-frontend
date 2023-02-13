import React from 'react'
import Image from './UIElements/Image'
import './User.css'
import { Link } from 'react-router-dom';
function User(props) {
  return (
    <div className='user'>
        <Image className="user-img" src={props.profile} />
        <Link to={`/user/${props.uid}`} className="user-info">
            <span className='user-info--name'>{props.name}</span>
            <p className='user-info--time'>{new Date(props.time).toDateString()}</p>
        </Link>
    </div>
  )
}

export default User