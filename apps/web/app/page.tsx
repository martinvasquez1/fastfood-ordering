import React from 'react';
import OrderButton from './common/buttons/orderButton';

function App() {
  return (
    <div className="container">
      <h1>Checkout</h1>
      <p>Confirm your items below:</p>
      
      {/* Include your button here */}
      <OrderButton />
    </div>
  );
}

export default App;
