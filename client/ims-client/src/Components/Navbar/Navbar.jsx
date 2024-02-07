import React, { useState } from 'react'
import Bicon from  '../../assets/icon.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
   
  return (
    <>

    



    <div className="navbar bg-base-300 md:px-8">
  <div className="navbar-start">
    <div className="dropdown">
      <button tabIndex={0} role="button" className="btn btn-ghost md:hidden">
      <span class="material-symbols-outlined">
menu
</span>
      </button>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1]  shadow bg-base-300 rounded-box w-auto  ">
      <button className=' btn btn-ghost w-40'><a>About</a></button>
      <button className=' btn btn-ghost w-40'><a>Contact Us</a></button>
      <button className=' btn btn-ghost w-40'><a>Help</a></button>
    
      </ul>
    </div>
    
    <a className="btn btn-ghost text-3xl font-bold"> 
    <img src={Bicon} className='h-8 w-8 opacity-50' alt="" />
     IMS</a>
    </div>
  <div className="navbar-center hidden md:flex">
    <ul className="menu menu-horizontal px-1">
    <li className='text-lg '><a>About</a></li>
      <li className='text-lg '><a>Contact Us</a></li>
      <li className='text-lg '><a>Help</a></li>
      </ul>
  </div>
  <div className="navbar-end">
 <Link to = "/signup"  >   <a className="btn md:btn-md btn-sm btn-primary btn-outline">Sign Up</a> </Link>
  </div>
</div>
    </>
  )
}

export default Navbar   