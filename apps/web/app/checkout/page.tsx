'use client';
import React from 'react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import OrderButton from '../../components/buttons/orderButton';
import CardOption from './CardOption/CardOption';
import AddressCard from './AddressCard/AddressCard';
import CreditCardIcon  from '../../components/svgs/CreditCardIcon';
import OrderItem from './OrderItem/OrderItem';
import FoodIcon from '../../components/svgs/FoodIcon';
import DeliverySection from './DeliverySection/DeliverySection';
import { PaymentSection } from './PaymentSection/PaymentSection';
import { OrderSummarySection } from './OrderSummarySection/OrderSummarySection';
import { useCart } from '../../context/CartContext';

// 1. IMPORT THE CSS MODULE
import styles from './CheckoutPage.module.css';

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

const DELIVERY_FEE = 2.50;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart(); 
  const [deliveryAddress, setDeliveryAddress] = useState<AddressData | null>(null);
  const selectedPaymentMethod = useRef<string | null>(null);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega productos en la tienda.');
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

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
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

    console.log('📦 Final Checkout Payload:', checkoutPayload);
    alert(`¡Pedido Confirmado! Procesando pago vía: ${selectedPaymentMethod.current.toUpperCase()}`);
    router.push('/order-tracking');
  };

  return (
    // 2. APPLIED CLEAN CLASSNAMES INSTEAD OF INLINE STYLES
    <main className={styles.mainContainer}>
      <div className={styles.desktopGrid}>
        
        <div className={styles.leftColumn}>
          <DeliverySection onAddressLoaded={(addr) => setDeliveryAddress(addr)} />
          <PaymentSection onMethodChange={(method) => { selectedPaymentMethod.current = method; }} />
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyStateSidebar}>
            <span>No hay productos en el carrito.</span>
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