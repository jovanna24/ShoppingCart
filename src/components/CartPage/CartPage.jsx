import React, { useState } from 'react'; // import React and useState from React
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'; // import PayPalButtons and PayPalScriptProvider from '@paypal/react-paypal-js'
import './CartPage.css'; // import CartPage.css
import Bat from '../../assets/images/bat.svg'; // import bat image
import Logo from '../../assets/images/PPLogo.svg'; // import PayPal logo

const CartPage = () => {
  const [orderId, setOrderId] = useState(''); // define orderId state and setOrderId function to update orderId state

  const handleApprove = (data) => {
    setOrderId(data.orderID); // update orderId state with data.orderID
    window.location.href = `/thank-you?orderId=${data.orderID}`; // redirect to thank-you page with orderId query parameter
  };

  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'USD',
  };

  return (
    <div className="cart-container"> 
      <h1 className="header">Welcome to JoJo's Sporting goods</h1> 
      <h2> Baseball Bat </h2> 
      <img src={Bat} alt="" /> 
      <div className="text-center"> 
        <div className="price">Price: $100.00 USD</div> 
      </div>
      <div className="buyer-info"> 
        <input type="text" placeholder="First Name" defaultValue="John" /> 
        <input type="text" placeholder="Last Name" defaultValue="Doe" /> 
        <input type="email" placeholder="Email" defaultValue="john.doe@example.com" /> 
        <input type="tel" placeholder="Phone" defaultValue="123-456-7890" /> 
        <input type="text" placeholder="Street" defaultValue="123 Main St" /> 
        <input type="text" placeholder="City" defaultValue="Anytown" /> 
        <input type="text" placeholder="State" defaultValue="CA" /> 
        <input type="text" placeholder="Zip" defaultValue="12345" /> 
      </div>
      <PayPalScriptProvider options={initialOptions}> {/* display PayPalScriptProvider */}
        <PayPalButtons
          className='paypal-button'
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: '100.00',
                  },
                },
              ],
            });
          }}
          onApprove={handleApprove}
        /> 
      </PayPalScriptProvider>
      <div className="footer"> 
        <img src={Logo} alt="Logo" /> 
      </div>
    </div>
  );
};

export default CartPage; 

