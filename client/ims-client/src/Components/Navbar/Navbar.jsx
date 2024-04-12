import React, { useState } from 'react'
import Bicon from  '../../assets/icon.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
   
  return (
    <>

    



    <div className="navbar bg-base-300 md:px-8">
  <div className="navbar-start">
    
    <Link to={"/"} className="btn btn-ghost text-3xl font-bold"> 
    <img src={Bicon} className='h-8 w-8 opacity-50' alt="" />
     IMS</Link>
    </div>
  <div className="navbar-center hidden md:flex">
   
  </div>
  <div className="navbar-end">
 <Link to = "/signup"  >   <span className="btn md:btn-md btn-sm btn-primary btn-outline">Sign Up</span> </Link>
  </div>
</div>
    </>
  )
}

export default Navbar   