import React from 'react'
import axios from 'axios';

    async function getValidAuth(){
        const response = await axios.get("/api/autoauthenticate");
        console.log(response)
        
    }


const ValidateAutoAuth = () => {
        
        getValidAuth();
        return (
        <>
        SomeData
        </>
            )
    
}

export default ValidateAutoAuth