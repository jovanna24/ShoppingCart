import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from "./components/CartPage/CartPage.jsx";
import Products from "./components/Products/Products.jsx";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage.jsx";
import "./App.css";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
