import React from 'react'
import Landing from './Pages/Landing'
import { Routes, Route } from 'react-router-dom';
import Error404 from './Pages/Error404';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import ValidateAutoAuth from './Pages/ValidateAutoAuth';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element = {<ValidateAutoAuth />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
        
        </Routes>
    </>
  )
}

export default App