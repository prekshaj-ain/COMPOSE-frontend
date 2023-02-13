import React from 'react'
import './Aside.css'
function Aside(props) {
  return (
    <div className={`${props.className} aside`} style={props.style}>{props.children}</div>
  )
}

export default Aside