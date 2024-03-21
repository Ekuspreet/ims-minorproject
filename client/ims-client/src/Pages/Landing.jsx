import React,{useContext, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import LandingHero from '../Components/Hero/LandingHero'
import AuthDisplay from '../Components/Hero/AuthDisplay'
import axios from 'axios'


const Landing = () => {
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/autoauthenticate")
      console.log("Is u logged in ?",response.data.isLoggedIn)
    };
  
    fetchData();
  }, []);
  

  return (
    
//  isLoggedIn ? (    <Navigate to= "/Profile" />
// ) :  
<>
    <Navbar/>

    <LandingHero/>

    <AuthDisplay/>

    </>
  )
}

export default Landing