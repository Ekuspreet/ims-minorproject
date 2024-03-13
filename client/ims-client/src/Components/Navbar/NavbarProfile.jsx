import React from 'react'
import Bicon from '../../assets/icon.png'
import { Link } from 'react-router-dom'
import { useState } from 'react';
const NavbarProfile = ({ toggler }) => {

    return (
        <>


            <div className="navbar bg-base-300 md:px-8 ">
                <div className="navbar-start">

                    <label tabIndex={0} htmlFor="my-drawer" role="button" className="btn btn-ghost drawer-button " onClick={toggler}>
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                    </label>


                    <Link to={"/profile"} className="btn btn-ghost text-3xl font-bold">
                        <img src={Bicon} className='h-8 w-8 opacity-50' alt="" />
                        IMS</Link>
                </div>

                <div className="navbar-center hidden md:flex">

                    <ul className="menu menu-horizontal px-1">
                        <li className='text-2xl '>Welcome Back {"User"} </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <button className="avatar" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <div className="  w-12  md:w-16 hover:cursor-pointer hover:rounded-xl rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>


                    </button>

                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">You can modify profile settings here</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-error">Log Out</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            <div className="navbar bg-base-300 md:px-8  md:hidden ">

                <div className="navbar-start">

                </div>

                <div className="navbar-center">

                    <p className='text-2xl text-center '>Welcome Back <br /> {"User"} </p>
                </div>

                <div className="navbar-end"></div>
            </div>



        </>
    )
}

export default NavbarProfile