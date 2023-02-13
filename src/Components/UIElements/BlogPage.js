import React from 'react'
import './BlogPage.css'
function BlogPage(props) {
  return (
    <div className={`${props.className} blogPage`} style={props.style}>{props.children}</div>
  )
}

export default BlogPage