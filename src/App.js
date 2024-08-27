import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './components/CartPage/CartPage.jsx';
import ThankYouPage from './components/ThankYouPage/ThankYouPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
