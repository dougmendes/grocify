import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe BrowserRouter
import './index.css'; // Importe o arquivo CSS do Tailwind
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <Router> 
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
