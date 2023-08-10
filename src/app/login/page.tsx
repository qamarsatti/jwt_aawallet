"use client"
// Import necessary dependencies
import React, { useState,CSSProperties  } from 'react';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import ClipLoader from "react-spinners/ClipLoader";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const color="#326ba8"

// Define the Login component
const Login: React.FC = () => {
  // State variables to hold the user's credentials
  const [email, setEmail] = useState('');
  let [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

 
  

  const cookieValue = "ok"
  
  // Function to handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Send the login request to the API
    try {
      setLoading(true)
      const response = await fetch('/api/auth/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        swal("succesfully login", "You clicked the button!", "success");
        Cookies.set('jwtToken', data.token, { expires: 1 });
       
        // You can also handle authentication token here
      } else {
        // Login failed
        swal("username or password incorrect", "You clicked the button!", "error");
        
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
    setLoading(false)
  };

  return (
    <>
    <div className='pl-10 pt-3'>
      <a href="/">
<div>Home</div></a>
    </div>
    <div className='flex justify-center items-center h-screen'>
    
      <div>
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        <div className='flex justify-center text-2xl font-bold'>Login</div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input className='border-2 ml-8 mt-10' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input className='border-2 mt-3' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className='bg-slate-500 text-white w-full mt-4 rounded-2xl'>Login</button>
      </form>
    </div>
    
    </div>

   
    </>
  );
};

export default Login;
