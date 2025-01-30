"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    
    

    
    router.push('/dashboard'); 
  };

  return (
    <div className='bg-gray-100 min-h-screen flex justify-center items-center  p-6 '>
      <div className='bg-white p-12 rounded-lg shadow-xl w-full max-w-xl'>
      <h2 className='text-black text-5xl font-bold mb-4 text-center mb-9 '>Employee Database Login</h2> 
      <div className='flex flex-col items-center gap-4'>
      <input
        type="text"
        value={username}
        className='w-1/3 p-2 border border-gray-300 text-black '
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        className='w-1/3 p-2 border border-gray-300 text-black'
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      </div>
      <div className='flex justify-center w-full mt-4'>
      <button 
      className=' bg-black text-white px-4 py-2 my-2 border rounded-md hover:bg-gray-50 hover:border-black hover:text-black'
      onClick={handleLogin} >Login</button>
      </div>
      </div>
    </div>
  );
}
