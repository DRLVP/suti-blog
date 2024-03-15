import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Home, LoginPage, SignupPage, AddPostPage, AllPostPage, EditPostPage, PostPage} from "./pages/index.js"
import { AuthLayout, Login } from './components/index.js'


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
                  <SignupPage/>
               </AuthLayout>
            )
         },
         {
            path:"/all-posts",
            element:(
               <AuthLayout authentication>
                  {" "}
                  <AllPostPage/>
               </AuthLayout>
            )
         },
         {
            path:"/add-post",
            element:(
               <AuthLayout authentication>
                  {" "}
                  <AddPostPage/>
               </AuthLayout>
            )
         },
         {
            path:"/edit-post/:slug",
            element:(
               <AuthLayout authentication>
                  {" "}
                  <EditPostPage/>
               </AuthLayout>
            )
         },
         {
            path:"/post/:slug",
            element:<PostPage/>
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
