import React, {useState} from 'react'
import authService from '../../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import {login} from "../../store/authSlice"
import {Input, Button, Logo} from "../index"
import { useDispatch } from 'react-redux'
import {useForm} from "react-hook-form"
import { ArrowRight } from "react-bootstrap-icons"

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
    <div className="flex justify-center items-center">
        <div className="flex items-center justify-center bg-base-100 px-2 py-6 sm:px-4 sm:py-8 lg:px-6 mt-8 rounded-md">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center items-center">
              <Link to="/">
                <Logo/>
              </Link>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-[#dadada]">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-500 transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            {
              error && <p className="text-red-600 w-full px-4">{error}</p>
            }
            <form onSubmit={handleSubmit(signup)} className="mt-8">
              <div className="space-y-5">
                <div className='w-full'>
                  <div className="mt-2">
                    <Input
                      label = "Name: "
                      type="text"
                      placeholder = "enter your name"
                      className = "w-full"
                      {
                        ...register("name", {
                          required:true
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <Input
                      label = "Email: "
                      type = "email"
                      placeholder = "enter your email"
                      {
                        ...register("email", {
                          required:true,
                          })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <Input
                      label = "Password: "
                      type = "password"
                      placeholder = "enter your password"
                      {
                        ...register("password", {
                            required:true,
                          })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className='min-w-80'
                  >
                    Sign up <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
    </div>
  )
}

export default Signup