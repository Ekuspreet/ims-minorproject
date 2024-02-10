import React, { useState } from 'react'
import NavbarSignup from '../Components/Navbar/NavbarSignup'
import axios from 'axios';
axios.defaults.timeout = 30000
axios.defaults.timeoutErrorMessage='timeout'
const SERVER_URL = import.meta.env.VITE_API_URL;
console.log(SERVER_URL)
const SignUp = () => {

    const [signUpData,setSignUpData] = useState({
    })

    function inputData(event){
        setSignUpData({
            ...signUpData,
            [event.target.name] : event.target.value,
        })
    }

    async function handleSubmit() {
        try {
          console.log("Request Data:", signUpData);
      
          const response = await axios.post(SERVER_URL + "user/signup", signUpData);
      
          // Handle the successful response
          console.log("Response:", response.data);
        } catch (error) {
          if (axios.isCancel(error)) {
            // Request was canceled
            console.log('Request canceled:', error.message);
          } else {
            // Handle other errors
            console.error('Error:', error);
      
            // Check if it's an "ECONNABORTED" error
            if (error.code === 'ECONNABORTED') {
              console.error('Request timed out. Check your server and network.');
            }
          }
        }
      }
      
    return (
        <>

            <NavbarSignup />


            <div className="hero min-h-screen bg-base-200  ">
                <div className="hero-content  flex-col md:flex-row  ">
                    <img  src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg" className=" w-10/12 md:w-7/12 max-w-md rounded-lg shadow-2xl" />
                    <div>


                        <div className="signup">
                            <form onSubmit={handleSubmit} className=' w-full flexflex-col justify-center items-center'>

                                <div className="label">
                                    <span className="label-text">Business Name</span>
                                </div>
                                <input  type="text" name = "business" onChange={inputData} placeholder="Type here" className="input input-bordered w-full" />

                                <div className="label">
                                    <span className="label-text">Email ID</span>
                                </div>
                                <input type="email"  name = "email" onChange={inputData} placeholder="Type here" className="input input-bordered w-full" />


                                <div className="label">
                                    <span className="label-text">Admin Name</span>
                                </div>
                                <input type="text"  name = "name" onChange={inputData} placeholder="Type here" className="input input-bordered w-full" />


                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input type="password"  name = "password" onChange={inputData}  placeholder="Type here" className="input input-bordered w-full" />

                                <input type='submit'  className="btn btn-success mt-4 w-full" value={"Sign Up"} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SignUp