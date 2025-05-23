import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import About from './Components/About.jsx'

import Home from './Components/Home.jsx'
import Data from './Components/Data.jsx'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import PlaceOrder from './Components/Placeorder.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Addtocart from './Components/Addtocart.jsx'
import Contact from './Components/Contact.jsx'
import Landing from './Components/Landing.jsx'
import Footer from './Components/Footer.jsx'
import History from './Components/History.jsx'
const App = () => {
 
 


  const router=createBrowserRouter([
    {
      path:"/",
      element:<>
      <Navbar/>
    <Landing/>
      <Footer/>
      </>
    },{
      path:"/login",
      element:<>
      <Login/>
      </>
    },
    {
      path:"/products",
      element:<>
      <Navbar/>
      <Data/>
      <Footer/>
      </>
    },
    {

 path:"/signup",
 element:<>
<Signup/>
 </>

    }, {
      path:'/addtocart',
      element:<>
      <Navbar/>
     <Addtocart/>
      <Footer/>
      </>
    }, {
      path:'/history',
      element:<>
      <Navbar/>
    <History/>
      <Footer/>
      </>
    }, {
      path:'/placeorder',
      element:<>
      <Navbar/>
  <PlaceOrder/>
      <Footer/>
      </>
    },
   
   
   
    {
      path:'/home',
      element:<>
      <Navbar/>
      <Home/>
      <Footer/>
      </>
    },{
     path:"/about",
     element:
     <>
     <Navbar/>
     <About/>
     <Footer/>
     </>

    },{
      path:"/contact",
      element:<>
      <Navbar/>
      <Contact/>
      <Footer/>
      </>
    }
  
  
    
  ])
  return (
  <>
 <RouterProvider router={router} />
  
  </>
  )
}

export default App