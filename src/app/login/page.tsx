"use client"
// Import necessary dependencies
import React, { useState } from 'react';
import Cookies from 'js-cookie';
// Define the Login component
const Login: React.FC = () => {
  // State variables to hold the user's credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variable to handle login status
  const [loginStatus, setLoginStatus] = useState('');
  

  const cookieValue = "ok"
  
  // Function to handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Send the login request to the API
    try {
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
        console.log(data.token)
        Cookies.set('jwtToken', data.token, { expires: 1 });
        setLoginStatus('Login successful');
        // You can also handle authentication token here
      } else {
        // Login failed
        setLoginStatus('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{loginStatus}</p>
      <p>{cookieValue}</p>
    </div>
  );
};

export default Login;
