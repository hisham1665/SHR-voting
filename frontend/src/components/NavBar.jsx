import React from 'react';
import { useAuth } from '../context/AuthContext'; // adjust path as needed
import { FiLogOut } from 'react-icons/fi';

function NavBar() {
  const { logoutUser, user } = useAuth();
  return (
    <div className='bg-blue-800 text-white px-6 py-4 flex justify-between items-center '>
      <h1 className='font-bold text-2xl sm:text-3xl'>Sahrdaya Voting System</h1>
      {user && (
        <button
          onClick={logoutUser}
          title="Logout"
          className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white transition duration-200"
        >
          <FiLogOut className="text-xl" />
        </button>
      )}
    </div>
  );
}

export default NavBar;
