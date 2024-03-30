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
      <section className="rounded-md bg-slate-950 p-2 min-w-[412px]  mx-auto mt-8">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center items-center">
              <Link to="/">
                <Logo/>
              </Link>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            {
              error && <p className="text-red-600">{error}</p>
            }
            <form onSubmit={handleSubmit(signup)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <div className="mt-2">
                    <Input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      label = "Name: "
                      type="text"
                      placeholder = "enter your name"
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
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
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

export default Signup