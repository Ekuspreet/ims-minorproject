import React, { useState } from 'react'
import Landing from './Pages/Landing'
import { Routes, Route } from 'react-router-dom';
import Error404 from './Pages/Error404';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
// import PrivateRoute from './Components/Functional/PrivateRoute';
// import axios  from 'axios';
// import PrivateRoutes from './Components/Functional/PrivateRoutes';


// const [isLoggedIn, setIsLoggedIn] = useState(false)


const App = () => {
  return (
    <>
    <Routes>
      
          <Route path='/Profile' element={ <Profile/> }  exact /> 

        <Route path="/" element={<Landing />} />
        <Route path="/Signup" element={<SignUp />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="*" element={<Error404 />} />
        
        </Routes>
    </>
  )
}

export default App