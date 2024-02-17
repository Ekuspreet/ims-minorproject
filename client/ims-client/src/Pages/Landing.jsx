import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import LandingHero from '../Components/Hero/LandingHero'
import AuthDisplay from '../Components/Hero/AuthDisplay'
import { Navigate } from 'react-router-dom'

const Landing = () => {
  return (
 false ? (    <Navigate to= "/Profile" />
) :  
<>
    <Navbar/>

    <LandingHero/>

    <AuthDisplay/>

    </>
  )
}

export default Landing