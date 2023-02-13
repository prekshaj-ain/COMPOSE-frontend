import React from 'react'
import { Link } from 'react-router-dom'
import './Tag.css'
function Tag(props) {
  return (
    <Link to={`/?cat=${props.children}`} className={`${props.className} tag`} style={props.style}>{props.children}</Link>
  )
}

export default Tag