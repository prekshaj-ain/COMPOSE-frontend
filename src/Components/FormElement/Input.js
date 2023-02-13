import React, { useState } from 'react'
import './Input.css'
function Input(props) {
    
    const [focused,setFocused] = useState(false);
    
    
    const blurHandler = ()=>{
        setFocused(true);
    }
    const element = props.element === 'input' ?
        <input
            className={props.inputStyle}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            style={props.style}
            onBlur={blurHandler}
            required={props.required}
            pattern={props.pattern}
            focused={focused.toString()}
            onChange = {props.onChange}
            onInput={props.onInput}
            name={props.name}
            value={props.value || ""}
            checked={props.checked}
            maxLength={props.maxlength}
        /> :
        <textarea
            id={props.id}
            row={props.rows || 3}
            style={props.style}
            required={props.required}
            className={props.inputStyle}
            placeholder={props.placeholder}
            onChange = {props.onChange}
            name={props.name}
            value={props.value || ""}

        />
  return (
    <div className={`form-control ${props.className}`}>
        <label htmlFor={props.id} style={props.labelStyle}>{props.label}</label>
        {element}
        <p className='errorText'>{props.errorMsg}</p>
    </div>
  )
}

export default Input