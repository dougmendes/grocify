
//Home.jsx
import React from 'react';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-black">
      <div className="navbar bg-base-100 justify-between items-center px-4 py-2">
          <a className="btn btn-ghost normal-case text-xl">Grocify</a>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <FaUserCircle size="100%" />
              </div>
            </label>
            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}><FaSignOutAlt className="mr-2"/>Sign out</a></li>
            </ul>
          </div>
          <div className="text-white mx-2 mt-2">
            {currentUser ? currentUser.displayName || currentUser.email: 'No user logged in'}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = { 
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired 
  })
};

export default Home;
