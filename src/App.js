import './index.css'; // Importe o arquivo CSS do Tailwind

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/Signup';
import { auth } from './firebase/firebase';
import { AuthProvider } from './context/AuthContext';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Debug log for seeing which user is logged in
        console.log('Logged in:', currentUser);
        setUser(currentUser);
      } else {
        // Debug log for when no user is logged in
        console.log('No user logged in');
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Routes> 
          <Route exact path='/login' element={<Login />}/>
          <Route exact path="/signup" element={<SignUp />} /> 
          <Route exact path='/home' element={<Home/>} />
          <Route path="/" element={user ? <Home user={user} /> : <Login />} /> 
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;