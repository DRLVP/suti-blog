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
    className={`px-4 py-2 bg-purple-900 text-white rounded-md ${className}`} 
    {...props}
    >
      {children}
    </button>
  )
}

export default Button;