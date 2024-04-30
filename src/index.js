import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe BrowserRouter
import './index.css'; // Importe o arquivo CSS do Tailwind
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router> 
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
