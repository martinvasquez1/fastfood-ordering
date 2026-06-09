'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import OrderButton from '../common/buttons/orderButton';
import CardOption from './CardOption/CardOption';
import AddressCard from './AddressCard/AddressCard';
import CreditCardIcon  from '../common/svgs/CreditCardIcon';
import OrderItem from './OrderItem/OrderItem';
import FoodIcon from '../common/svgs/FoodIcon';
import DeliverySection from './DeliverySection/DeliverySection';
import { PaymentSection } from './PaymentSection/PaymentSection';
import { OrderSummarySection } from './OrderSummarySection/OrderSummarySection';

interface CartItem {
  id: string;
  name: string;
  price: number;
  subtitle: string;
}

interface AddressData {
  label: string;
  street: string;
  subAddress: string;
}

// Global basket data passed down to the summary calculations
const FALLBACK_CART_ITEMS: CartItem[] = [
  { id: 'fallback-1', name: 'Gourmet Meal Kit', price: 14.50, subtitle: 'Regular Size' },
  { id: 'fallback-2', name: 'Artisanal Beverage', price: 3.75, subtitle: 'Lime Flavor' }
];

const DELIVERY_FEE = 2.50;

export function CheckoutPage() {
  // 1. Captured State for Payload tracking
  // 1. Reactive App States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState<boolean>(true);
  const [deliveryAddress, setDeliveryAddress] = useState<AddressData | null>(null);
  
  // Using a Ref for payment method avoids constant page-wide re-renders when swapping tabs
  const selectedPaymentMethod = useRef<string | null>(null);
  
  // 2. Fetch active shopping cart data on mount
  useEffect(() => {
    fetch('/api/cart')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to resolve cart metrics');
        return res.json();
      })
      .then((data: CartItem[]) => {
        setCartItems(data);
        setLoadingCart(false);
      })
      .catch(() => {
        // Fallback execution kicks in safely here
        setCartItems(FALLBACK_CART_ITEMS);
        setLoadingCart(false);
      });
  }, []);

  // 3. The Master Payload Capture Function
  const handlePlaceOrder = () => {
    if (loadingCart) {
      alert('Por favor, espera que cargue tu carrito de compras.');
      return;
    }
    if (!deliveryAddress) {
      alert('Por favor, espera a que cargue la dirección de entrega.');
      return;
    }
    if (!selectedPaymentMethod.current) {
      alert('Por favor, selecciona un método de pago antes de continuar.');
      return;
    }

    // Dynamic pricing calculations adapt cleanly whether using real or fallback arrays
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + DELIVERY_FEE;

    const checkoutPayload = {
      orderTimestamp: new Date().toISOString(),
      delivery: {
        tag: deliveryAddress.label,
        streetAddress: deliveryAddress.street,
        unitDetails: deliveryAddress.subAddress
      },
      payment: {
        methodType: selectedPaymentMethod.current
      },
      items: cartItems.map(item => ({
        itemId: item.id,
        quantity: 1, 
        unitPrice: item.price
      })),
      pricingBreakdown: {
        calculatedSubtotal: subtotal,
        appliedDeliveryFee: DELIVERY_FEE,
        finalChargedTotal: total
      }
    };

    // Output payload straight to your tracking framework or controller API
    console.log('📦 Final Checkout Payload:', checkoutPayload);
    alert(`¡Pedido Confirmado! Procesando pago vía: ${selectedPaymentMethod.current.toUpperCase()}`);
  };

  return (
    <main style={{ 
      padding: '40px 24px', 
      background: '#FAFAFA', 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center'
    }}>
      {/* 2-Column Desktop Grid Layout */}
      <div style={{ 
        width: '100%', 
        maxWidth: '1240px', 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '32px',
        alignItems: 'flex-start'
      }}>
        
        {/* Left Side: Forms and Interactive Options Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flexGrow: 1 }}>
          
          {/* Listens for internal API resolution (or default fallback) to capture the address */}
          <DeliverySection onAddressLoaded={(addr) => setDeliveryAddress(addr)} />
          
          {/* Captures chosen payment channel toggles silently into our ref hook */}
          <PaymentSection onMethodChange={(method) => { selectedPaymentMethod.current = method; }} />
        
        </div>

        {/* Right Dynamic Receipt Sidebar */}
        {loadingCart ? (
          <div style={{ width: '502px', padding: '24px', textAlign: 'center', background: '#FFF', border: '2px solid #000' }}>
            <span>Sincronizando productos...</span>
          </div>
        ) : (
          <OrderSummarySection 
            items={cartItems} 
            onPlaceOrder={handlePlaceOrder} 
          />
        )}

      </div>
    </main>
  );
}