import React from 'react';
import { useLocation } from 'react-router-dom';
import './ThankYouPage.css';
import Logo from '../../assets/images/PPLogo.svg';

const ThankYouPage = () => {
  // Use the useLocation hook to get the current location object from the browser history.
  // The location object contains information about the current URL, including the query string.
  const { search } = useLocation();

  // The URLSearchParams API allows us to easily parse the query string in the URL.
  // We create a new URLSearchParams object, passing in the search property of the location object.
  const params = new URLSearchParams(search);

  // We can then use the get method of the URLSearchParams object to retrieve the value of a specific parameter in the query string.
  // In this case, we're retrieving the value of the 'orderId' parameter.
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
