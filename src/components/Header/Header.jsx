import React from 'react'
import {Container, Logo, LogoutBtn} from "../../components/index"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MenuButton, X, XCircle } from 'react-bootstrap-icons'


const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

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
    <header className="navbar bg-base-100">
      <Container>
        <nav className="w-full flex justify-between items-center">
          <div className="navbar-start">
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          <ul className="navbar-end flex-1 flex justify-end items-center gap-8 max-lg:hidden">
            {
              navItems.map((item)=>(
                item.active?
                <li key={item.name} className="text-lg font-semibold text-[#DADADA]  transition-all list-none">
                  <Link to={item.url} className="btn btn-ghost text-xl">
                    {item.name}
                  </Link>
                </li>:null
              ))
            }
            <div>
                {
                  authStatus && <LogoutBtn/>
                }
            </div>
          </ul>
          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
            }}>
            <MenuButton className='text-[#DADADA] text-2xl font-semibold'/>
          </div>
          {isMenuOpen && (
            <div>
              <nav className="fixed top-0 right-0  bottom-0 lg:bottom-auto bg-[#DADADA] min-w-80 z-50">
                <div
                  className="hidden max-lg:block fixed right-[-0px]  px-8 py-4 cursor-pointer"
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  <X className="text-4xl text-[#011A25]" />
                </div>
                <ul className=" lg:hidden flex flex-col items-center justify-center h-full ">
                  {navItems.map((item) => (
                    item.active?
                    <li key={item.name} className='mb-4'>
                      <Link
                        to={item.url}
                        className="font-semibold text-lg text-[#011A25]"
                        onClick={()=> setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>:null
                  ))}

                  <div>
                    {
                      authStatus && <LogoutBtn/>
                    }
                  </div>
                </ul>
              </nav>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header