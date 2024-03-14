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
        <label htmlFor={id}>{label}</label>
        <select 
        id={id} 
        className={`${className}`} 
        ref={ref} 
        {...props}>
            {
                options?.map((item) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))
            }
        </select>
    </div>
  )
}

export default forwardRef(Select)