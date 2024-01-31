import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const apiUrl = process.env.API_URL;
function App() {
  const [message, setMessage] = useState("Fetching Data ....");

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setMessage(response.data.message);
      console.log(response.data)
    });
  }, []);

  return (
    <>
      {message}
    </>
  );
}

export default App;
