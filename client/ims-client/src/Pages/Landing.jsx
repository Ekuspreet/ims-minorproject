import React,{useContext, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import LandingHero from '../Components/Hero/LandingHero'
import AuthDisplay from '../Components/Hero/AuthDisplay'
import axios from 'axios'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'

const Landing = () => {
 const [user,setUser] = useContext(UserContext)  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/autoauthenticate")
      console.log("Is u logged in ?",response.data.isLoggedIn)
      setUser({
        ...user,
        "loggedIn" : response.data.isLoggedIn
      })
    };
    
    fetchData();
  }, []);
  

  return (
    
 user.loggedIn ? (    <Navigate to= "/Profile" />
) :  
<>
    <Navbar/>

    <LandingHero/>

    <AuthDisplay/>

    </>
  )
}

export default Landing