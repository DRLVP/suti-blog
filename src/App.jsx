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
        <main className="bg-[#011A25] min-h-screen">
          <Outlet/>
        </main>
      <Footer/>
    </div>
  </div> : <section className="w-screen h-screen flex justify-center items-center">
    <progress className="progress w-56"></progress>
  </section>;
    
  
}

export default App;
