import React, {useEffect} from 'react'

import Navbar from '../Components/Navbar/Navbar'
import LandingHero from '../Components/Hero/LandingHero'
import AuthDisplay from '../Components/Hero/AuthDisplay'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const Landing = () => {

  return (
      
  //  user.loggedIn ? (    <Navigate to= "/Profile" />
  // ) :  
<>
    <Navbar/>

    <LandingHero/>

    <AuthDisplay/>

    </>
  )
}

export default Landing