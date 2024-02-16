import React from 'react'
import axios from 'axios';

const ValidateAutoAuth = async () => {
        const response = await axios.get("/api/");
        console.log(response)
    
}

export default ValidateAutoAuth