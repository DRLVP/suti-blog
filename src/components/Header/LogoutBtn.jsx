import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from "../../store/authSlice"
import { BoxArrowInRight } from "react-bootstrap-icons"

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
    }
  return <button onClick={logoutHandler} className="flex justify-center items-center text-sm gap-1 btn btn-outline btn-success transition-all">
    logout
    <BoxArrowInRight className="text-lg font-semibold"/>
  </button>
  
}

export default LogoutBtn