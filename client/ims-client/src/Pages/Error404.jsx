import React from 'react'
import { Link } from 'react-router-dom'
const Error404 = () => {
  return (
    <>



        <div role="alert" className="alert alert-error mt-10 w-10/12 mx-auto">
        <span className="material-symbols-outlined ">
error
</span>
 <span className='text-xl font-bold' >The Page You Are Looking For Does Not Exist</span>
  <div>
   < Link  to={"/"} >   <button className="btn btn-md">Visit HomePage</button> </Link>
  </div>
</div>
    </>
  )
}

export default Error404