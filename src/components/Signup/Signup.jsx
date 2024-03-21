import React, {useState} from 'react'
import authService from '../../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {login} from "../../store/authSlice"
import {Input, Button, Logo} from "../index"
import { useDispatch } from 'react-redux'
import {useForm} from "react-hook-form"


const Signup = () => {
  const navigate = useNavigate()
  const dispacth = useDispatch()
  const {register, handleSubmit} = useForm()
  const [error, setError] = useState("")

  const signup = async(data)=>{
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const user = await authService.getCurrentUser()
        if (user) {
          dispacth(login(user))
          navigate("/")
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    
    <div className="flex items-center shadow-xl gap-2">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 text-black font-semibold`}>
        <div className="mb-2 flex justify-center">
          <Logo/>
        </div>
        
        <p>
          alreay have an account?
          <Link to="/signin" className="ml-2 text-blue-600 underline">
            sign in
          </Link>
        </p>
        {
          error && <p className="text-red-600">{error}</p>
        }

        <form onSubmit={handleSubmit(signup)}>
          <div className='w-full'>
            <Input
              label = "Name: "
              type="text"
              placeholder = "enter your name"
              {
                ...register("name", {
                  required:true
                })
              }
            />
            <Input
              lable = "Email: "
              type = "email"
              placeholder = "enter your email"
              {
                ...register("email", {
                  required:true,
                  })
              }
              />
              <Input
                lable = "Password: "
                type = "password"
                placeholder = "enter your password"
                {
                  ...register("password", {
                      required:true,
                    })
                }
              />
              <Button
                type = "submit"
               >Sign up</Button>
          </div>
        </form>
      </div>
    </div>

    



    
  
  )
}

export default Signup