'use client';
import React from 'react';
import { useState } from 'react';
import OrderButton from './common/buttons/orderButton';
import CardOption from './paymentScreen/CardOption/CardOption';
import AddressCard from './paymentScreen/AddressCard/AddressCard';
import CreditCardIcon  from './common/svgs/CreditCardIcon';

function App() {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  return (
    <div style={{ padding: '24px' }}>
      
      <AddressCard 
        label="Home"
        street="123 Fry Street, Gourmet Valley"
        subAddress="Apartment 4B, Blue Building"
      />

    </div>
  );
}

export default App;
