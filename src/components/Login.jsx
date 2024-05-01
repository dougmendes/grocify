import React, { useState } from 'react';
import { auth, signInWithPopup, GoogleAuthProvider } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginEmailAndPassword = async () => {
    try {
      await auth.signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful!');
      navigate('/home')
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  const handleGoogleLogin = async () => {
    try{
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('Login successful!');
      navigate('/home')
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  const handleSignUpRedirect = () => {
    navigate('/signup')
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
