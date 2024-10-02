// import necessary components and hooks
import { useNavigate } from "react-router-dom";//navigate between routes
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"; //paypal integration components
import "./CartPage.css";
import Logo from "../../assets/images/PPLogo.svg";
import { CartContext } from "../../context/CartContext.jsx"; //import cart context to access cart-state
import { useContext } from "react"; //hook to access context

const CartPage = () => {
  //destructure cart from context to access cart-state
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  //use navigate hook to navigate between routes
  const navigate = useNavigate();
  
  //paypal integration, handles payment approval
  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) =>{ //capture details of payment
      navigate('/thank-you', { //navigate to thank-you page
        state: { //pass data to thank-you page
          orderId: data.orderID, 
          amount: details.purchase_units[0].amount.value, 
          currency: details.purchase_units[0].amount.currency_code
        }
      });
    }); 
  }; 

  //paypal script provider options
  const initialOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
  };

  return (
    <div className="cart-container">
      <div className="text-center">
        <div className="cart-content">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p> 
          ) : (
            cart.map((item, index) => ( 
              <div className="cart-item" key={index}>
                <img src={item.img} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => updateQuantity(item, item.quantity + 1)}>Increase Quantity</button>
                <button onClick={() => updateQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>Decrease Quantity</button>
                <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
              </div>
            ))
          )}
          <div className="cart-total">
            <p>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>
        </div>
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
            const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: totalAmount, // pass the total amount
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
