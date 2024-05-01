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
      if (error.code === 'auth/user-not-found'){
        setError('User not registered. Please sign up.');
      }else if( error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential'){
        setError('Error logging in. Please check your email and password.');
      }else if ( error.code === 'auth/too-many-requests'){
        setError('This user has been temporarily disabled due to too many failed login attempts. Please try again later or reset your password.');
      }
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
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-black">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-500">Grocify</h2>
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleLoginEmailAndPassword}
        >
          Login
        </button>
        <button
          className="w-full px-4 py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="inline-block mr-2" />
          Login with Google
        </button>
        <button
          className="w-full px-4 py-2 text-black rounded-md hover:text-green-600"
          onClick={handleSignUpRedirect}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
