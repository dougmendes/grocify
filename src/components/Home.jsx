import React from 'react';
import { auth } from '../firebase/firebase'; 
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut(); 
    navigate("/login")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-black">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-500">Bem-vindo!</h2>
        {user && <p className="text-center">Email: {user.email}</p>}
        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};


Home.propTypes = { 
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  })
};

export default Home;
