// Header component that displays a welcome message and dynamic links based on the current path
import React from 'react'
import { Link, useLocation } from 'react-router-dom' //links between routes, useLocation is used to get the current path
import './Header.css'

const Header = () => {

    const location = useLocation(); //get current route location  
    const currentPath = location.pathname; // get current path

  return (
    <div>
      <div className="header-contents">
        <h1>Welcome to JoJo's Sporting goods</h1>
        <p>Trusted since 2024!</p>
        {/* Dynamic links based on current path */}
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
