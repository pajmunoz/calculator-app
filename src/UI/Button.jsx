import React from 'react'
import './Button.css'

function Button(props) {
 
  return (

       <div  className="btn btn-primary">{props.btnProps.val}</div>
     
  )
}

export default Button