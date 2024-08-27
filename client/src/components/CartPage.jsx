import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
// import './CartPage.css'; // Import your custom CSS

const CartPage = () => {
  const [orderId, setOrderId] = useState('');

  const handleApprove = (data) => {
    setOrderId(data.orderID);
    window.location.href = `/thank-you?orderId=${data.orderID}`;
  };

  const initialOptions = {
    clientId: 'AQfANXPQDniBE-RuFxPFsBlIyz0nxN5YS0U0FsCtXb2i8PPBaohbSTWLk6qaxArDCj7Msd0a63D6UDzM',
    currency: 'USD',
  };

  return (
    <div className="cart-container">
      <h2 className="text-center">ai-generated NFT Bored Ape</h2>
      <div className="text-center">
        <div className="price">$100.00 USD</div>
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
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
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
    </div>
  );
};

export default CartPage;
