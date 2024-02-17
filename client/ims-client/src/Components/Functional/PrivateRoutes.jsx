import React from 'react'
import { Navigate, Outlet, Route, Routes, redirect } from 'react-router-dom';

async function getValidAuth(){
    const response = await axios.get("/api/autoauthenticate");
    return false
  }
  

const PrivateRoutes = () => {
    return(
    false ? <Outlet /> : <Navigate to={'/'}/>
    )
}

export default PrivateRoutes