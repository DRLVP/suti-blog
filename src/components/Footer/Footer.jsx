import React from 'react'
import {Logo, PostCard} from "../index";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const authStatus = useSelector((state) => state.status);
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

    <footer className="w-full bg-slate-950 shadow-xl py-8">
      <div className="flex justify-between px-8">
          <div>
            <h3 className="text-2xl underline">Impotant Links</h3>
            <ul className="flex flex-col gap-2 mt-4">
            {
              navItems.map(item => 
                item.active?
                  <div key={item.name}>
                    <li className="text-xl">
                      <button onClick={()=> navigate(item.url)}>{item.name}</button>
                    </li>
                  </div>
                :null)
              }
            </ul>
          </div>
          <div>
              <Logo/>
          </div>
          <div>
           
          </div>
      </div>
    </footer>
  )
}

export default Footer