import React from "react";
import "./Checkout.css";

function Checkout() {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form>
        <div className="form-group">
          <label htmlFor="address">Shipping Address</label>
          <input type="text" id="address" name="address" required />
        </div>
        <div className="form-group">
          <label htmlFor="payment">Payment Method</label>
          <input type="text" id="payment" name="payment" required />
        </div>
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
}

export default Checkout;
