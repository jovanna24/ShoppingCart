import React from 'react';
import { useLocation } from 'react-router-dom';
import './ThankYouPage.css';
import Logo from '../../assets/images/PPLogo.svg';

const ThankYouPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const orderId = params.get('orderId');

  return (
    <div className="thank-you-container">
      <h2>Thank You!</h2>
      <p>Your transaction ID is: {orderId}</p>
      <img src={Logo} alt="" />
    </div>
  );
};

export default ThankYouPage;
