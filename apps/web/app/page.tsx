'use client';
import React from 'react';
import { useState } from 'react';
import OrderButton from './common/buttons/orderButton';
import CardOption from './paymentScreen/CardOption/CardOption';
import CreditCardIcon  from './common/svgs/CreditCardIcon';

function App() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <CardOption 
        title="Credit Card" 
        subtitle="Visa ending in 4421" 
        icon={<CreditCardIcon />}
        isActive={activeMethod === 'card'}
        onClick={() => setActiveMethod('card')}
      />

      <CardOption 
        title="PayPal" 
        subtitle="Pay with your PayPal account" 
        icon={<div style={{ width: 20, height: 16, background: '#003087' }} />} // Quick placeholder
        isActive={activeMethod === 'paypal'}
        onClick={() => setActiveMethod('paypal')}
      />

    </div>
  );
}

export default App;
