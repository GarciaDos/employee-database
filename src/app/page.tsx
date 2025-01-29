'use client';
import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useEffect, useState } from 'react';


type User = {
  id: number;
  firstName: string;
  lastName: string;
  dateEmployed: string;
  status: string;
};


export default function Home() {
  const [user, setuser] = useState<User[]>([]);

  // Fetch employee data from the API when the component mounts
  useEffect(() => {
    async function fetchuser() {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setuser(data);
      } else {
        console.error('Failed to fetch employees');
      }
    }

    fetchuser();
  }, []);
  
 /// async function adduser(){
 /// const user = await prisma.user.create({
 ///   data: {
 ///     lastName: 'elsa@prisma.io', //find a way to get this functional by input
 ///     firstName: 'Elsa Prisma',
 ///     dateEmployed: '2023-23-09',
///      status: 'Active',
 ///   },
 /// });
 /// }
  
  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-black text-3xl font-bold mb-4 text-center mb-9">Employee List</h1>
      
      <button 
      className='flex bg-black text-white px-4 py-2 my-2 border rounded-md hover:bg-gray-50 hover:border-black hover:text-black' onClick={() => setOpen(true)}>
        Add employee
        </button>
      
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-black border border-gray-300 p-2">First Name</th>
            <th className="text-black border border-gray-300 p-2">Last Name</th>
            <th className="text-black border border-gray-300 p-2">Date Employed</th>
            <th className="text-black border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="text-black border border-gray-300 p-2">{user.firstName}</td>
              <td className="text-black border border-gray-300 p-2">{user.lastName}</td>
              <td className="text-black border border-gray-300 p-2">{new Date(user.dateEmployed).toLocaleDateString()}</td>
              <td className="text-black border border-gray-300 p-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}