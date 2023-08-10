"use client"
import React, { useState } from 'react';
import axios from 'axios';

interface ApiResponse {
    success: boolean;
    message: string;
  }


  // Cookies.set('jwtToken', "jwtToken", { expires: 1 });



// Verify the token
// jwt.verify(token, secretKey, (err, decoded) => {
//   if (err) {
//     console.error('Token verification failed:', err.message);
//   } else {
//     console.log('Decoded payload:', decoded);
//   }
// });




function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<ApiResponse>('/api/auth/create', { name,email, password });
      console.log(response.data.message);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>

      <div>
          <label>name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
