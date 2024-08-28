import React, { useContext } from 'react'
import './Products.css' 
import Bat from '../../assets/images/bat.svg';
import Glove from '../../assets/images/glove.svg';
import BattingGlove from '../../assets/images/battingGlove.svg';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { CartContext } from '../../context/CartContext.jsx';
import Logo from '../../assets/images/PPLogo.svg';

const Products = () => {

    const { addToCart, removeFromCart, cart } = useContext(CartContext);

    const products = [
        { 
            name: "Baseball Bat",
            itemNumber: "12345",
            price: 100.00,
            img: Bat
        }, 
        { 
            name: "Baseball Glove",
            itemNumber: "12346",
            price: 50.00,
            img: Glove    
        }, 
        {
            name: "Batting Glove",
            itemNumber: "12347",
            price: 25.00,
            img: BattingGlove
        }
    ];

    const getQuantity = (itemNumber) => {
        const item = cart.find(product => product.itemNumber === itemNumber);
        return item ? item.quantity : 0;
    }

  return (
    <div>
    <div className='product-container'>

      {products.map((product, index) => {
        return (
          <ProductCard 
          key={index} 
          product={product}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart} 
          quantity={getQuantity(product.itemNumber)}
          />
        )
      })}
      
    </div>
    <div className="footer-content">
      <img src= {Logo} alt="logo" />
    </div>
    </div>
    
  )
}

export default Products;
