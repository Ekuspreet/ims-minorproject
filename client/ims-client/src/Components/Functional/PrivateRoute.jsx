import React from 'react'
import { Navigate, Route, Routes, redirect } from 'react-router-dom';



const PrivateRoute = ({ Default, AuthFlag, Component, NewRoute }) => {
    if (AuthFlag) {
        // Dynamically create a new route


        // Render the new route and navigate to it immediately
        return (
            <>
               
                    <Route path={NewRoute} element={<Component/>} />
                
                <Navigate to={NewRoute} />
            </>
        );

    }

    else {

        return <Navigate to={Default} />
    }
}

export default PrivateRoute