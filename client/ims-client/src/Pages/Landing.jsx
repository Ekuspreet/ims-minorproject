import React,{useEffect, useState} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import LandingHero from '../Components/Hero/LandingHero'
import AuthDisplay from '../Components/Hero/AuthDisplay'
import { Navigate } from 'react-router-dom'
import axios from 'axios'


const Landing = () => {
  // console.log(log)

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/autoauthenticate");
      setIsLoggedIn(response.data.isLoggedIn);
      console.log("Is u logged in ?",response.data.isLoggedIn)
    };
  
    fetchData();
  }, []);
  

  return (
    
 isLoggedIn ? (    <Navigate to= "/Profile" />
) :  
<>
    <Navbar/>

    <LandingHero/>

    <AuthDisplay/>

    </>
  )
}

export default Landing