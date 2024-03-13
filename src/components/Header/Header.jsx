import React from 'react'
import {Container, Logo, LogoutBtn} from "../../components/index"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {
  const authStatus = useSelector(state => state.auth.status);

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
    <header>
      <Container>
        <nav>
          <div>
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          <ul>
            {
              navItems.map(item => 
                item.active?
                  <li key={item.name}>
                    <button onClick={()=> navigate(item.url)}>{item.name}</button>
                  </li>
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