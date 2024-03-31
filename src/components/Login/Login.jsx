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
    <section className="rounded-md bg-[#050404] p-2 max-w-[412px]  mx-auto mt-8">
      <div className="flex items-center justify-center bg-[#DADADA] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center items-center">
            <Link to="/">
                <Logo/>
            </Link>
          </div>
          <h2 className="text-2xl text-center font-bold leading-tight text-[#011A25]">Sign in to your account</h2>
          <p className="mt-2text-sm text-gray-600 text-center">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#011A25] transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
            {
                error && <p className="text-red-600">{error}</p>
            }
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <div>
                <div className="mt-2">
                  <Input
                    className="flex h-10 w-full rounded-md border border-[#050404] bg-transparent text-[#011A25] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    label="Email:"
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
                    className="flex h-10 w-full rounded-md border border-[#050404] bg-transparent text-[#011A25] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="enter your password"
                    label="Password:"
                    {
                        ...register("password", {
                            required:true,
                        })
                    }
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#1636C6] text-[#DADADA] px-3.5 py-2.5 font-semibold leading-7 hover:bg-[#011A25]"
                >
                  Sign In <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  </div>
  )
}

export default Login;