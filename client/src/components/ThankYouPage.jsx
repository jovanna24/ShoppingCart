import React from 'react';
import { useLocation } from 'react-router-dom';

const ThankYouPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const orderId = params.get('orderId');

  return (
    <div className="thank-you-container">
      <h2>Thank You!</h2>
      <p>Your transaction ID is: {orderId}</p>
    </div>
  );
};

export default ThankYouPage;
