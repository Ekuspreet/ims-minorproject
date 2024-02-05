import React from 'react'
import { Link } from 'react-router-dom'
import Bicon from  '../../assets/icon.png'

const NavbarSignup = () => {
    return (
        <>

            <div className="navbar bg-base-300 md:px-8">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-3xl font-bold">
                        <img src={Bicon} className='h-8 w-8 opacity-50' alt="" />
                        IMS</a>
                </div>

                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className='text-2xl '>Welcome To IMS </li>
                    </ul>
                </div>
                
                <div className="navbar-end">
                <Link to={"/"} >    <a className="btn md:btn-md btn-sm btn-error btn-outline ">Go Back</a> </Link>
               
                </div>
            </div>

        </>
    )
}

export default NavbarSignup