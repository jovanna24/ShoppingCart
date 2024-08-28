import React from 'react';
import { useLocation } from 'react-router-dom';
import './ThankYouPage.css';
import Logo from '../../assets/images/PPLogo.svg';

const ThankYouPage = () => {
  const { state  } = useLocation();

  const orderId = state?.orderId;
  const amount = state?.amount;
  const currency = state?.currency;

  return (
    <div className="thank-you-container">
      <h2>Thank You!</h2>
      <p>Your transaction ID is: {orderId}</p>
      <p>Total Amount: {amount} {currency} </p>
      <img src={Logo} alt="" />
    </div>
  );
};

export default ThankYouPage;
