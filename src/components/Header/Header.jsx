import React from 'react'
import {Container, Logo, LogoutBtn} from "../../components/index"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  const navItems = [
    {
      name:"Home",
      url:"/",
      active: true
    },
    {
      name:"login",
      url:"/login",
      active:!authStatus
    },
    {
      name: "signup",
      url:"/signup",
      active:!authStatus
    },
    {
      name:"all posts",
      url: "/all-posts",
      active:authStatus
    },
    {
      name:"add post",
      url : "/add-post",
      active:authStatus
    }
  ]
  return (
    <header className="w-full h-20 shadow-xl bg-slate-950">
      <Container>
        <nav className="w-full h-full flex justify-between px-8 items-center">
          <div>
            <Link to="/">
              <Logo width="40px"/>
            </Link>
          </div>
          <ul className="flex gap-4">
            {
              navItems.map(item => 
                item.active?
                  <div key={item.name}>
                    <li className="text-2xl">
                      <button onClick={()=> navigate(item.url)}>{item.name}</button>
                    </li>
                  </div>
                :null)
            }
            {
              authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header