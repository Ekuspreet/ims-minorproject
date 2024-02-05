import React from 'react'
import NavbarSignup from '../Components/Navbar/NavbarSignup'
const SignUp = () => {
    return (
        <>

            <NavbarSignup />


            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content  flex-col md:flex-row  ">
                    <img  src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg" className=" w-10/12 md:w-2/6 max-w-md rounded-lg shadow-2xl" />
                    <div>


                        <div className="signup">
                            <form className=' w-full flexflex-col justify-center items-center'>

                                <div className="label">
                                    <span className="label-text">Business ID</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full" />

                                <div className="label">
                                    <span className="label-text">Email ID</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full" />


                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input type="password" placeholder="Type here" className="input input-bordered w-full" />

                                <input type='submit' className="btn btn-success mt-4 w-full" value={"Log In"} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SignUp