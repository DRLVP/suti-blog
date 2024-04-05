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
    className='inline-block mb-1 pl-1 text-[#dadada] font-semibold' 
    htmlFor={id}>
        {label}
    </label>
    }
    <input
    type={type}
    className={`${className} input input-bordered w-full max-w-xs`}
    ref={ref}
    {...props}
    id={id}
    />
</div>
  )
})

export default Input;