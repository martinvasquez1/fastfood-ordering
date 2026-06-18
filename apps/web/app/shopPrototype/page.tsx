'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function ShopPrototypePage() {
  const router = useRouter();
  
  // Grab the addItemToCart action from your global context
  const { addItemToCart, cartItems } = useCart();

  // Define the static item that matches your CartItem interface precisely
  const STATIC_PRODUCT = {
    id: 'prod-101',
    name: 'Premium Sushi Combo',
    price: 20,
    subtitle: '12 Pieces - Chef Special',
  };

  const handleAddData = () => {
    addItemToCart(STATIC_PRODUCT);
    alert(`"${STATIC_PRODUCT.name}" agregado al estado global.`);
  };

  return (
    <main style={{ 
      padding: '40px 24px', 
      background: '#F0F2F5', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ 
        background: '#FFF', 
        padding: '32px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ fontSize: '20px', marginBottom: '8px' }}>Pantalla Prototipo</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
          Simulador para cargar datos en el estado global (`CartContext`).
        </p>

        {/* The Action Button */}
        <button 
          onClick={handleAddData}
          style={{ 
            background: '#0070F3', 
            color: '#FFF', 
            border: 'none', 
            padding: '14px 24px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            width: '100%',
            marginBottom: '16px',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#0051CB')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#0070F3')}
        >
          Añadir Producto Estático
        </button>

        {/* Live counter to verify it works instantly */}
        <div style={{ margin: '16px 0', fontSize: '14px', fontWeight: '500' }}>
          Unidades totales en el carrito: <span style={{ color: '#0070F3' }}>
            {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
          </span>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '20px 0' }} />

        {/* Navigation Shortcut to your Checkout page */}
        <button 
          onClick={() => router.push('/checkout')}
          style={{ 
            background: 'transparent', 
            color: '#333', 
            border: '1px solid #CCC', 
            padding: '10px 16px', 
            borderRadius: '6px', 
            fontSize: '14px', 
            cursor: 'pointer'
          }}
        >
          Ir a Pagar (CheckoutPage) →
        </button>
      </div>
    </main>
  );
}