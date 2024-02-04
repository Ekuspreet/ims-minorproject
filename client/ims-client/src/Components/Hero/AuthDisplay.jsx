import React from 'react'

const AuthDisplay = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row  mx-1 md:mx-8 mt-4 justify-center gap-12  ">

                <div className="card w-auto h-auto  bg-base-100 bg-opacity-80  shadow-xl image-full  ">
                    <figure><img className="w-screen " src="https://img.freepik.com/free-vector/illustrated-business-person-meditating_52683-60757.jpg" alt="Shoes" /></figure>
                    <div className="card-body items-center">
                        <h2 className="card-title text-lg mx-auto md:text-3xl "> I am a <span className='text-primary font-bold' > MANAGER</span> </h2>
                        <div className="divider"> Login </div>

                        <form action="#" className=' w-full flexflex-col justify-center items-center'>

                            <div className="label">
                                <span className="label-text">Business ID</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />

                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />

                            {/* <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                         */}
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" placeholder="Type here" className="input input-bordered w-full" />

                            <input type='submit' className="btn btn-success mt-4 w-full" value={"Log In"} />
                        </form>
                    </div>
                </div>

                

                <div className="card w-auto h-auto  bg-base-100 bg-opacity-80  shadow-xl image-full  ">
            <figure><img className="w-screen" src="https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg" alt="Shoes" /></figure>
                    <div className="card-body items-center">
                        <h2 className="card-title text-lg mx-auto md:text-3xl "> I am a <span className='text-primary font-bold' > EMPLOYEE</span> </h2>
                        <div className="divider"> Login </div>

                        <form action="#" className=' w-full flexflex-col justify-center items-center'>

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



        </>

    )
}

export default AuthDisplay