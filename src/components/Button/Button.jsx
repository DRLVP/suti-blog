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
    className={`px-4 py-2 bg-[#1636C6] text-[#DADADA] rounded-sm ${className}`} 
    {...props}
    >
      {children}
    </button>
  )
}

export default Button;