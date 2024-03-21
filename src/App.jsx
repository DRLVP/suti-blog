import { useEffect, useState } from "react"
import {Header, Footer} from "./components/index"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice"
import { Outlet } from "react-router-dom";
import conf from "./conf/conf";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(()=>{
    // check user looged in or not
    authService.getCurrentUser()
        .then((userData)=> {
          if (userData) {
            dispatch(login({userData}))
          }else{
            dispatch(logout())
          }
        })       
        .finally(()=> setLoading(false))
       
  },[])

  return !loading?
  <div className="w-full text-white">
    <div>
      <Header/>
        <main className=" bg-blue-950 h-screen">
          <Outlet/>
        </main>
      <Footer/>
    </div>
  </div> : <h1>Loading...</h1>;
    
  
}

export default App
