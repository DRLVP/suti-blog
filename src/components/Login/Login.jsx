import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from "../../store/authSlice"
import {Logo, Input, Button} from "../index"
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useForm } from 'react-hook-form'

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
    <div className="w-full">
        <div className="w-full">
            <div>
                <Link>
                    <Logo/>
                </Link>
            </div>
            <h2 className="text-center text-3xl font-bold mt-8">Sign in to your account</h2>
            <Link to="/signup">
                <p>Don't have an account</p>
            </Link>
            {
                error && <p>{error}</p>
            }

            <form onSubmit={handleSubmit(login)}>
                <div>
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
                    >Sign in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login