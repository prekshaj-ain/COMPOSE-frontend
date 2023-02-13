import React from 'react'
import './Section.css'
function Section(props) {
  return (
    <div className={`${props.className} section`} style={props.style}>{props.children}</div>
  )
}

export default Section