"use client"
import React, { useState,CSSProperties } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import ClipLoader from "react-spinners/ClipLoader";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const color="#326ba8"



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
  let [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post<ApiResponse>('/api/auth/create', { name,email, password });
      // console.log(response.data.message);
      swal("succesfully create account", "You clicked the button!", "success");
    } catch (error:any) {
      console.error('An error occurred:', error.response.data.errors[0]);
      swal(error.response.data.errors[0], "You clicked the button!", "error");
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
      <div className='flex justify-center text-2xl font-bold'>Signup Form</div>
      <form onSubmit={handleSubmit}>

      <div>
          <label>name:</label>
          <input className='border-2 ml-8 mt-10' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input className='border-2 ml-8 mt-3' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input className='border-2 mt-3' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='bg-slate-500 text-white w-full mt-4 rounded-2xl' type="submit">Sign Up</button>
      </form>
    </div>
    </div>
    </>
  );
}

export default SignupForm;
