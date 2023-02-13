import React, { useEffect, useRef } from 'react'
function CheckOutsideClick(props) {
    const ref = useRef(null);
    const handleClickOutside = function(event){
        if(ref.current && !ref.current.contains(event.target)){
            props.onClickHandler && props.onClickHandler();
        }
    }
    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true);
        return ()=>{
            document.removeEventListener('click',handleClickOutside, true);
        }
        // eslint-disable-next-line
    },[])
    if(!props.children) return null;
  return (
    <div ref={ref}>{props.children}</div>
  )
}

export default CheckOutsideClick