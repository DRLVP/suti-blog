import React, {forwardRef, useId} from 'react'

const Input = ({
    label, 
    type = "text", 
    className = "", 
    ...props}, ref) => {

    const id = useId()
  return (
    <div>
       {
        label && <label 
                    htmlFor={id}
                    className="">
                        {label}
                </label>
       }
       <input 
       type={type} 
       className={`${className}`} 
       ref={ref}
       {...props}
       id={id}
       />
    </div>
  )
}

export default forwardRef(Input);