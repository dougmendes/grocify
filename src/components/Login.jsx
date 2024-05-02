
//Login.jsx
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginEmailAndPassword = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please check your email and password.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('Login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in with Google. Please try again later.');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-black">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Grocify</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full bg-gray-200 mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full bg-gray-200 mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 py-2">{error}</p>}
        <button
          className="btn btn-primary btn-block mt-4"
          onClick={handleLoginEmailAndPassword}
        >
          Login
        </button>
        <button
          className="btn btn-error btn-block mt-2"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="mr-2" />
          Login with Google
        </button>
        <button
          className="btn btn-link btn-block mt-2 text-blue-800 hover:text-blue-900"
          onClick={handleSignUpRedirect}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
