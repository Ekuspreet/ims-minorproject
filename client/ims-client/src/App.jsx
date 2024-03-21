import React, { useState } from 'react';
import Landing from './Pages/Landing';
import { Routes, Route } from 'react-router-dom';
import Error404 from './Pages/Error404';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import { createContext } from 'react';


const UserContext = createContext();
  
const App = () => {

  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={[ user, setUser ]}>
      <Routes>
        <Route path='/Profile' element={<Profile />} hidden = {user.loggedIn} />
        <Route path="/" element={<Landing />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
export {UserContext};