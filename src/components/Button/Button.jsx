import React from 'react'

const Button = ({
    children,
    type  = "button",
    className ="",
    ...props
}) => {
  return (
    <button 
    type={`${type}`} 
    className={`px-4 py-2  btn btn-outline btn-success ${className}`} 
    {...props}
    >
      {children}
    </button>
  )
}

export default Button;