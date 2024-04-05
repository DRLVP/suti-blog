import React, {forwardRef, useId} from 'react'

const Select = ({
    options = [],
    label,
    className="",
    ...props
}, ref) => {
    const id = useId()
  return (
    <div>
        <label htmlFor={id} className='text-[#dadada] font-semibold'>{label}</label>
        <select 
        id={id} 
        className={`${className} select select-success w-full max-w-xs`} 
        ref={ref} 
        {...props}>
            {
                options?.map((item) => (
                    <option value={item} key={item} className='text-[#dadada] text-xl'>
                        {item}
                    </option>
                ))
            }
        </select>
    </div>
  )
}

export default forwardRef(Select)