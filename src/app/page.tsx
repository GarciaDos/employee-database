'use client';
import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useEffect, useState } from 'react';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  dateEmployed: string;
  status: string;
};

const EditEmployeeModal = ({
  setOpen,
  userToEdit,
  handleUpdate
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userToEdit: User | null;
  handleUpdate: (updatedUser: User) => void;
}) => {
  const [firstName, setFirstName] = useState(userToEdit?.firstName || '');
  const [lastName, setLastName] = useState(userToEdit?.lastName || '');
  const [position, setPosition] = useState(userToEdit?.position || '');
  const [status, setStatus] = useState(userToEdit?.status || 'Active');
  const [dateEmployed, setDateEmployed] = useState(userToEdit?.dateEmployed || '');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = {
      id: userToEdit?.id || 0,
      firstName,
      lastName,
      position,
      status,
      dateEmployed
    };

    handleUpdate(updatedUser);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-black">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
           <input
            type="text"
            placeholder="Position"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={dateEmployed}
            onChange={(e) => setDateEmployed(e.target.value)}
            required
          />
          <select
            className="w-full p-2 mb-3 border border-gray-300 text-black bg-white focus:outline-none "
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Update Employee</button>
        </form>
        <button onClick={() => setOpen(false)} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

const AddEmployeeModal = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Active');
  const [dateEmployed, setDateEmployed] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      position,
      status,
      dateEmployed,
    };
    
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    

    if (response.ok) {
      setOpen(false); // Close the modal after successful submission
      window.location.reload();
      
    } else {
      console.error('Failed to add employee');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-black">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Position"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 mb-3 border border-gray-300 text-black"
            value={dateEmployed}
            onChange={(e) => setDateEmployed(e.target.value)}
            required
          />
          <select
            className="w-full p-2 mb-3 border border-gray-300 text-black bg-white focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="w-full bg-black text-white p-2 rounded-md">Add Employee</button>
        </form>
        <button onClick={() => setOpen(false)} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({
  userId,
  setOpenModal,
  handleDelete
}: {
  userId: number;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: number) => void;
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4 text-black">Are you sure you want to delete this record?</h2>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              handleDelete(userId);  // Delete the user
              setOpenModal(false); // Close the modal after deletion
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={() => setOpenModal(false)} // Close modal without deleting
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [user, setuser] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false); // For showing the delete confirmation modal
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null); // Store user ID to delete
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setEditModalOpen(true);
  };
  
  const handleUpdate = async (updatedUser: User) => {
    const response = await fetch(`/api/user/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      setuser((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    } else {
      console.error('Failed to update employee');
    }
  };

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
  
  const filteredUsers = user.filter((u) => {
    const matchesFirstName = u.firstName.toLowerCase().includes(firstNameFilter.toLowerCase());
    const matchesLastName = u.lastName.toLowerCase().includes(lastNameFilter.toLowerCase());
    const matchesPosition = u.position.toLowerCase().includes(positionFilter.toLowerCase());
    const matchesStatus = statusFilter ? u.status === statusFilter : true;
  
    return matchesFirstName && matchesLastName && matchesPosition && matchesStatus;
  });

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/user/${id}`, {
      method: 'DELETE', // Sending the DELETE request to the user ID route
    });
  
    if (response.ok) {
      // Successfully deleted, filter out the user from the state
      setuser(user.filter((u) => u.id !== id));
    } else {
      const errorData = await response.json();
      console.error('Failed to delete user:', errorData);
    }
  };

  const openDeleteModal = (id: number) => {
    setUserIdToDelete(id);
    setOpenModal(true); //
  };
  
  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-black text-3xl font-bold mb-4 text-center mb-9">Employee List</h1>

    <div className="mb-4 flex gap-4">
      <input
        type="text"
        placeholder="Filter by First Name"
        className="w-1/3 p-2 border border-gray-300 text-black"
        value={firstNameFilter}
        onChange={(e) => setFirstNameFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by Last Name"
        className="w-1/3 p-2 border border-gray-300 text-black"
        value={lastNameFilter}
        onChange={(e) => setLastNameFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by Position"
        className="w-1/3 p-2 border border-gray-300 text-black"
        value={positionFilter}
        onChange={(e) => setPositionFilter(e.target.value)}
      />
      <select
        className="w-1/3 p-2 border border-gray-300 text-black bg-white focus:outline-none"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
      
      <button 
        className='flex bg-black text-white px-4 py-2 my-2 border rounded-md hover:bg-gray-50 hover:border-black hover:text-black'
        onClick={() => setOpen(true)}
      >
        Add employee
      </button>

      {/* Conditionally render the AddEmployeeModal */}
      {open && <AddEmployeeModal setOpen={setOpen} />}
      
      {editModalOpen && userToEdit && (
        <EditEmployeeModal
          setOpen={setEditModalOpen}
          userToEdit={userToEdit}
          handleUpdate={handleUpdate}
        />
      )}
      
      
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-black border border-gray-300 p-2 text-sm">Id</th>
            <th className="text-black border border-gray-300 p-2 text-sm">First Name</th>
            <th className="text-black border border-gray-300 p-2 text-sm">Last Name</th>
            <th className="text-black border border-gray-300 p-2 text-sm">Position</th>
            <th className="text-black border border-gray-300 p-2 text-sm">Date Employed</th>
            <th className="text-black border border-gray-300 p-2 text-sm">Status</th>
            <th className="text-black border border-gray-300 p-2 text-sm">Modify</th>

          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (  //{user.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="text-black border border-gray-300 p-2 text-sm">{user.id}</td>
              <td className="text-black border border-gray-300 p-2 text-sm">{user.firstName}</td>
              <td className="text-black border border-gray-300 p-2 text-sm">{user.lastName}</td>
              <td className="text-black border border-gray-300 p-2 text-sm">{user.position}</td>
              <td className="text-black border border-gray-300 p-2 text-sm">{new Date(user.dateEmployed).toLocaleDateString()}</td>
              
              <td className="text-black border border-gray-300 p-2 text-sm">
                <span
                  className={`w-4 h-4 inline-block rounded-full mr-2 ${
                    user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                {user.status}
              </td>
              <td className="text-black border border-gray-300 p-2 flex justify-center gap-2">
              <button 
                className="bg-green-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleEditClick(user)}
              >
                Edit
              </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => openDeleteModal(user.id)} // Show delete confirmation modal
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
      {openModal && userIdToDelete !== null && (
        <DeleteConfirmationModal
          userId={userIdToDelete}
          setOpenModal={setOpenModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}