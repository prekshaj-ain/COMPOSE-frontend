import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
function Modal(props) {
    const content = (
      <div className={`modal ${props.className}`}>
          <div className={`modal-content ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`modal-footer ${props.footerClass}`}>
            {props.footer}
          </footer>
      </div>
    )
  return (
    ReactDOM.createPortal(content,document.getElementById('modal-hook'))
  )
}

export default Modal