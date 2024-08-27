import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './components/CartPage.jsx';
import ThankYouPage from './components/ThankYouPage.jsx';

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
