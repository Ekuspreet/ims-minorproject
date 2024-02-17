import React, { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, redirect } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';


const PrivateRoutes = () => {
    
    return(
    <Outlet/>
    )
}

export default PrivateRoutes