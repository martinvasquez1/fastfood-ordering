'use client';
import React from 'react';
import { useState } from 'react';
import OrderButton from './common/buttons/orderButton';
import CardOption from './paymentScreen/CardOption/CardOption';
import AddressCard from './paymentScreen/AddressCard/AddressCard';
import CreditCardIcon  from './common/svgs/CreditCardIcon';
import OrderItem from './paymentScreen/OrderItem/OrderItem';
import FoodIcon from './common/svgs/FoodIcon';

function App() {
  const [activeMethod, setActiveMethod] = useState<string>('card');

  return (
    <div style={{ padding: '24px', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. Review Order Items */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-plus-jakarta)', marginBottom: '12px' }}>Your Order</h3>
        <OrderItem 
          name="Gourmet Burrito"
          price="$14.50"
          subtitle="Regular Size"
          icon={<FoodIcon />} // Uses your custom food icon safely centered
        />
      </div>
    </div>
  );
}

export default App;
