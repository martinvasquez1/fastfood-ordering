'use client';
import React from 'react';
import { useState } from 'react';
import OrderButton from './common/buttons/orderButton';
import CardOption from './paymentScreen/CardOption/CardOption';
import AddressCard from './paymentScreen/AddressCard/AddressCard';
import CreditCardIcon  from './common/svgs/CreditCardIcon';
import OrderItem from './paymentScreen/OrderItem/OrderItem';
import FoodIcon from './common/svgs/FoodIcon';
import DeliverySection from './paymentScreen/DeliverySection/DeliverySection';
import { PaymentSection } from './paymentScreen/PaymentSection/PaymentSection';

function App() {
  const [activeMethod, setActiveMethod] = useState<string>('card');

  return (
    <main style={{ 
      padding: '40px 24px', 
      background: '#FAFAFA', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      
      {/* Renders the whole delivery component with header, cards, and state */}
      <PaymentSection />

    </main>
  );
}

export default App;
