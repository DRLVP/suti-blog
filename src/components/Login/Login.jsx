import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from "../../store/authSlice"
import {Logo, Input, Button} from "../index"
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from 'react-hook-form'
import { ArrowRight } from "react-bootstrap-icons"


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data)=>{
        setError("")
        try {
           const session = await authService.login(data)
           if (session) {
               const userData = await authService.getCurrentUser()
               if (userData) dispatch(authLogin(userData))
               navigate("/")
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
            <h2 className="text-2xl text-center font-bold leading-tight text-[#dadada]">Sign in to your account</h2>
            <p className="mt-2text-sm text-gray-400 text-center">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-blue-500 transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <span>
              {
                  error && <p className="text-red-600">{error}</p>
              }
            </span>
            <form onSubmit={handleSubmit(login)} className="mt-8">
              <div className="space-y-5">
              
                <div>
                  <div className="mt-2">
                    <Input
                      type="email"
                      label="Email:"
                      placeholder = "enter your email"
                      value="test@example.com"
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
                      type="password"
                      placeholder="enter your password"
                      label="Password:"
                      value="123456789"
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
                    className='w-full'
                  >
                    Sign In <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
    </div>
  
  )
}

export default Login;