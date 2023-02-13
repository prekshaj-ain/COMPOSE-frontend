import React from 'react'
import './Image.css'
function Image(props) {
  let url;
  if(props.src === '' || props.src === undefined || !props.src){
    url = '/Assets/ProfilePicture.png'
  }else if(props.src.startsWith("blob")){
    url = props.src;
  }
  else{
    url = `${process.env.REACT_APP_BACKEND_URL}/${props.src}`
  }
  return (
    <img src={url} alt={props.alt} className={`image-ui ${props.className}`} style={props.style} />
  )
}

export default Image;