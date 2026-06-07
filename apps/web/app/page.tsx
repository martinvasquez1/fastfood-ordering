'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import OrderButton from './common/buttons/orderButton';
import LoginButton from './common/buttons/LoginButton';
import CardOption from './paymentScreen/CardOption/CardOption';
import AddressCard from './paymentScreen/AddressCard/AddressCard';
import CreditCardIcon  from './common/svgs/CreditCardIcon';
import OrderItem from './paymentScreen/OrderItem/OrderItem';
import FoodIcon from './common/svgs/FoodIcon';
import Modal from './common/modal/Modal';
import LoginForm from './common/forms/LoginForm';

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeMethod, setActiveMethod] = useState<string>('card');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoginSubmit = (email: string, password: string) => {
    setIsLoading(true);
    setLoginError('');
    
    // TODO: Aquí iría la llamada a tu API de autenticación
    console.log('Login attempt:', { email, password });
    
    // Simulación de espera
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Si es exitoso, guarda el token y cierra el modal
      // setIsLoginModalOpen(false);
      
      // Por ahora, mostrar un mensaje de demo
      setLoginError('Este es un formulario de demo. Conectalo a tu API en apps/api');
    }, 1000);
  };

  const handleSignUpClick = () => {
    // TODO: Aquí abrirías el modal de registro
    console.log('Ir a registro');
    // Por ahora solo cierra el modal de login
    setIsLoginModalOpen(false);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Login Button - Top of page */}
      <div>
        <LoginButton onClick={() => setIsLoginModalOpen(true)} />
      </div>

      {/* 1. Review Order Items */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-plus-jakarta)', marginBottom: '12px' }}>Your Order</h3>
        <OrderItem 
          name="Gourmet Burrito"
          price="$14.50"
          subtitle="Regular Size"
          icon={<FoodIcon />}
        />
      </div>

      {/* Login Modal */}
      {isMounted && (
        <Modal
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            setLoginError('');
          }}
          title="Portal Clientes"
        >
          <LoginForm 
            onSubmit={handleLoginSubmit}
            onSignUp={handleSignUpClick}
            isLoading={isLoading}
            error={loginError}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
