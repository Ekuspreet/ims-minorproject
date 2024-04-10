import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const AuthDisplay = () => {

    const navigate = useNavigate()

    const [managerLoginData, setManagerLoginData] = useState({
    })
    const [employerLoginData, setEmployerLoginData] = useState({
    })

    function inputData(event, role) {
        if (role == "employer") {
            setEmployerLoginData({
                ...employerLoginData,
                [event.target.name]: event.target.value,
            })
        }
        if (role == "manager") {
            setManagerLoginData({
                ...managerLoginData,
                [event.target.name]: event.target.value,
            })

        }

        console.log(role, "  data changed")

    }

    async function LogIn(event, loginData, role) {

        event.preventDefault();

        const finalLoginData = {
            ...loginData,
            'role': role
        };

        try {

            console.log("Submission", finalLoginData);

            const response = await axios.post("/api/user/login", finalLoginData);
            console.log(response)
            navigate("/profile")
        } catch (error) {

            console.error("Error:", error);


        }

    }




    return (
        <>
            <div className="flex flex-col md:flex-row  mx-1 md:mx-8 mt-4 justify-center gap-12   ">

                <div className="card w-auto h-[30em]  bg-base-100 bg-opacity-80   shadow-xl image-full  ">
                    <figure><img className="w-screen " src="https://img.freepik.com/free-vector/illustrated-business-person-meditating_52683-60757.jpg" alt="Shoes" /></figure>
                    <div className="card-body items-center">
                        <h2 className="card-title text-lg mx-auto md:text-3xl "> I am a <span className='text-primary font-bold' > MANAGER</span> </h2>

                        <form onSubmit={(event) => LogIn(event, managerLoginData, "admin")} className=' md:w-10/12 w-full flexflex-col justify-center items-center'>

                            <div className="label">
                                <span className="label-text" >Business ID</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={managerLoginData.business_id} name='business_id' onChange={event => { inputData(event, "manager") }} />

                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={managerLoginData.email} name='email' onChange={event => { inputData(event, "manager") }} />


                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" placeholder="Type here" className="input input-bordered w-full" value={managerLoginData.password} name='password' onChange={event => { inputData(event, "manager") }} />
                            <center>
                                <input type='submit' className="btn btn-success mt-12 w-6/12 font-bold " value={"Log In"} />
                            </center>
                        </form>
                    </div>
                </div>



                <div className="card w-auto h-[30em]  bg-base-100 bg-opacity-80  shadow-xl image-full  ">
                    <figure><img className="w-screen" src="https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg" alt="Shoes" /></figure>
                    <div className="card-body items-center">
                        <h2 className="card-title text-lg mx-auto md:text-3xl "> I am an <span className='text-primary font-bold' > EMPLOYEE</span> </h2>
                        {/* <div className="divider"> Login </div> */}

                        <form onSubmit={(event) => LogIn(event, employerLoginData, "employee")} className='md:w-10/12 w-full flexflex-col justify-center items-center'>

                            <div className="label">
                                <span className="label-text">Business ID</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={employerLoginData.business_id} name='business_id' onChange={event => { inputData(event, "employer") }} />

                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={employerLoginData.email} name='email' onChange={event => { inputData(event, "employer") }} />


                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" placeholder="Type here" className="input input-bordered w-full" value={employerLoginData.password} name='password' onChange={event => { inputData(event, "employer") }} />
                            <center>
                                <input type='submit' className="btn btn-success mt-12 w-6/12 font-bold " value={"Log In"} />
                            </center>
                        </form>
                    </div>
                </div>




            </div>



        </>

    )
}

export default AuthDisplay