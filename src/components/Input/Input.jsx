import React, {forwardRef, useId} from 'react'

const Input = forwardRef(({
  label,
  type = "text",
  className = "",
  ...props
}, ref)=>{
  const id = useId()
  return(
    <div className='w-full'>
    {label && <label 
    className='inline-block mb-1 pl-1 text-[#011A25] font-semibold' 
    htmlFor={id}>
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
})

export default Input;