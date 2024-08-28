import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {

    const location = useLocation(); 
    const currentPath = location.pathname;

  return (
    <div>
      <div className="header-contents">
        <h1>Welcome to JoJo's Sporting goods</h1>
        <p>Trusted since 2024!</p>
        {currentPath === '/' ? (
        <Link to="/cart" className="view-cart" >View Cart</Link>
        ) : (
        <Link to="/" className="home">Home</Link>
        )
}
      </div>
    </div>
  )
}

export default Header
