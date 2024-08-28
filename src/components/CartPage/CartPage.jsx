import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./CartPage.css";
import Bat from "../../assets/images/bat.svg";
import Logo from "../../assets/images/PPLogo.svg";

const CartPage = () => {

  const navigate = useNavigate();
  
  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) =>{
      navigate('/thank-you', {
        state: {
          orderId: data.orderID, 
          amount: details.purchase_units[0].amount.value, 
          currency: details.purchase_units[0].amount.currency_code
        }
      });
    }); 
  }; 

  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
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
        <input
          type="email"
          placeholder="Email"
          defaultValue="john.doe@example.com"
        />
        <input type="tel" placeholder="Phone" defaultValue="123-456-7890" />
        <input type="text" placeholder="Street" defaultValue="123 Main St" />
        <input type="text" placeholder="City" defaultValue="Anytown" />
        <input type="text" placeholder="State" defaultValue="CA" />
        <input type="text" placeholder="Zip" defaultValue="12345" />
      </div>
      <PayPalScriptProvider options={initialOptions}>
        {" "}
        {/* display PayPalScriptProvider */}
        <PayPalButtons
          className="paypal-button"
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "100.00",
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
