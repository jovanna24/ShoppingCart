// displays product details and options to add/remove from cart
import React from 'react'
import PropTypes from 'prop-types'; 
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onRemoveFromCart, quantity}) => { //destructure props

  return (
    <div className='product-card'>
        <h2>{product.name}</h2>
        <p>Item Number: {product.itemNumber}</p>
        <p>${product.price} USD</p>
        <img src={product.img} alt={product.name} />
        <br />
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        <button onClick={() => onRemoveFromCart(product)}>Remove from Cart</button>
        <p>Quantity: {quantity}</p>
    </div>
  );
}; 

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        itemNumber: PropTypes.string,
        price: PropTypes.number,
        img: PropTypes.object  
    }).isRequired, 
    onAddToCart: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired
};

export default ProductCard;
