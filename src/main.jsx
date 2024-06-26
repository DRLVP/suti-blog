import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Home, Login, Signup, AddPost, AllPost, EditPost, Post} from "./pages/index.js"
import { AuthLayout } from './components/index.js'


const router = createBrowserRouter([
   {
      path: '/',
      element:<App/>,
      children:[
         {
            path:"/",
            element:<Home/>
         },
         {
            path:"/login",
            element:(
               <AuthLayout authentication={false}>
                  <Login/>
               </AuthLayout>
            )
         },
         {
            path:"/signup",
            element:(
               <AuthLayout authentication={false}>
                  <Signup/>
               </AuthLayout>
            )
         },
         {
            path:"/all-posts",
            element:(
               <AuthLayout authentication>
                  {" "}
                  <AllPost/>
               </AuthLayout>
            )
         },
         {
            path:"/add-post",
            element:(
               <AuthLayout authentication>
                  {" "}
                  <AddPost/>
               </AuthLayout>
            )
         },
         {
            path:"/edit-post/:slug",
            element:(
               <AuthLayout authentication>
                  {" "}
                  <EditPost/>
               </AuthLayout>
            )
         },
         {
            path:"/post/:slug",
            element:<Post/>
         }
      ]
   }
])


ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
     <React.StrictMode>
        <RouterProvider router={router}/>
     </React.StrictMode>
  </Provider>,
)
