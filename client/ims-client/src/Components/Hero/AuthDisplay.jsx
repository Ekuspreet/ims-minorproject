import React from 'react'

const AuthDisplay = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row  mx-1 md:mx-8 mt-4 justify-center gap-8 ">

                <div className="card w-auto h-96  bg-base-100 shadow-xl image-full">
                    <figure><img className="w-screen" src="https://img.freepik.com/free-vector/illustrated-business-person-meditating_52683-60757.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-lg mx-auto md:text-3xl "> I am a <span className='text-primary font-bold' > MANAGER</span> </h2>

                    </div>
                </div>

                <div className="card w-auto h-96 bg-base-100 shadow-xl image-full">
                    <figure><img className="w-screen" src="https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-lg mx-auto md:text-3xl">I am an <span className='text-primary font-bold ' > EMPLOYEE </span></h2>

                    </div>
                </div>


            </div>



        </>

    )
}

export default AuthDisplay