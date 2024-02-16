import React from 'react'
import { Link } from 'react-router-dom'

const LandingHero = () => {
  return (
    

<div className="hero min-h-96 mt-1 " style={{backgroundImage: 'url(https://img.freepik.com/premium-photo/warehouse-indoor-view_103577-1356.jpg?)'}}>
  <div className="hero-overlay bg-opacity-80"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-2xl font-bold">Welcome To <br></br> <span className=' text-primary text-7xl'>IMS</span></h1>
      <p className="mb-5">Empower your business with our one-stop solution for effortless and humane inventory management. Streamline operations with a touch of compassion!</p>
      <Link to={"/signup"} className="btn btn-glass">Sign Up Now!</Link>
    </div>
  </div>
</div>

  )
}

export default LandingHero