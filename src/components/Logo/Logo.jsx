import React from 'react'
import { Link } from 'react-router-dom'
import sutiBlog from "../../assets/logo.png"

const Logo = ({width = "100px"}) => {
  return <div>
    <Link to="/">
      <img src={sutiBlog} alt="logo" className="w-24" />
    </Link>
  </div>
  
}

export default Logo