import { useEffect, useState } from "react"
import {Header, Footer} from "./components/index"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice"
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
  <div>
    <div>
      <Header/>
        <main>
          {/* <Outlet/> */}
        </main>
      <Footer/>
    </div>
  </div> : <h1>Loading...</h1>;
    
  
}

export default App
