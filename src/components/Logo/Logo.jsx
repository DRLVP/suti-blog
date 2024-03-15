import React from 'react'

const Logo = ({width = "100px"}) => {
  return <div className={width}>
    <b className="text-2xl">SUTI<span className="text-red-500">BLOG</span></b>
  </div>
  
}

export default Logo