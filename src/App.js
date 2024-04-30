import './index.css'; // Importe o arquivo CSS do Tailwind

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/Signup';
import { auth } from './firebase/firebase';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Routes> 
        <Route exact path='/login' element={<Login />}/>
        <Route exact path="/signup" element={<SignUp />} /> 
        <Route exact path='/home' element={<Home/>} />
        <Route path="/" element={user ? <Home user={user} /> : <Login />} /> 

      </Routes>
    </div>
  );
}

export default App;