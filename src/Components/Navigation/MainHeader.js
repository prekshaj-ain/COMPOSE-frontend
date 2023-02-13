import React, { useEffect, useState } from 'react'
import './MainHeader.css'
function MainHeader(props) {
  const [showNav,setShowNav] = useState(false);
  useEffect(()=>{
    let oldValue = 0;
    let newValue = 0;
    window.addEventListener('scroll',(e)=>{
      newValue = window.pageYOffset;
      oldValue - newValue < 0 ? setShowNav(false) : setShowNav(true);
      oldValue = newValue;
    })
  },[])
  return (
    <header className='mainHeader' style={{ top : showNav ? '0' : '-100px' }}>{props.children}</header>
  )
}

export default MainHeader