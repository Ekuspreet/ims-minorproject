import React from 'react'
import Landing from './Pages/Landing'
import { Routes, Route } from 'react-router-dom';
import Error404 from './Pages/Error404';
import SignUp from './Pages/SignUp';

const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Error404 />} />
        
        </Routes>
    </>
  )
}

export default App