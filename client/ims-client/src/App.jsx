import React from 'react'
import Landing from './Pages/Landing'
import { Routes, Route } from 'react-router-dom';
import Error404 from './Pages/Error404';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import PrivateRoute from './Components/Functional/PrivateRoute';
import axios  from 'axios';

async function getValidAuth(){
  const response = await axios.get("/api/autoauthenticate");
  return response.data.isLoggedIn
}


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element = {<PrivateRoute 
            Default = "/landing"
            AuthFlag = {getValidAuth()}
            Component = <Profile/>
            NewRoute = "/Profile"
            />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="*" element={<Error404 />} />
        
        </Routes>
    </>
  )
}

export default App