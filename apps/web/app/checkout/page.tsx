'use client';
import React from 'react';
import { useState, useEffect } from 'react';
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
import { useAuth } from '../../context/AuthContext';

// 1. IMPORT THE CSS MODULE
import styles from './CheckoutPage.module.css';

interface AddressModel {
  id: string;
  label: string;
  street: string;
  subAddress?: string;
}

interface PaymentMethodModel {
  id: string;
  provider: string;
  lastFour: string;
  methodType: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart(); 
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // Dynamic state selectors instead of old raw string hooks
  const [selectedAddress, setSelectedAddress] = useState<AddressModel | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodModel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Router guard protection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      alert('Debes iniciar sesión para acceder al proceso de pago.');
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  // Loading execution guard boundary to ensure user object exists safely below
  if (isLoading || !isAuthenticated || !user) {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.loadingStatePlaceholder}>
          <span>Verificando credenciales de acceso seguro...</span>
        </div>
      </main>
    );
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega productos en la tienda.');
      return;
    }
    if (!selectedAddress) {
      alert('Por favor, selecciona una dirección de entrega.');
      return;
    }
    if (!selectedPayment) {
      alert('Por favor, selecciona un método de pago antes de continuar.');
      return;
    }

    setIsSubmitting(true);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const DELIVERY_FEE = 2.50;
    const total = subtotal + DELIVERY_FEE;

    // Match the POST /payments backend data schema contract exactly
    const backendOrderPayload = {
      id: `ord-${Math.floor(Math.random() * 90000) + 10000}`,
      userId: user.id,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber || ''
      },
      driverId: null,
      driver: null,
      restaurantId: 'rest-active-provider-id',
      restaurant: {
        id: 'rest-active-provider-id',
        name: 'The Fry Factory',
        branchLocation: 'Main Downtown Block'
      },
      status: 'PENDING',
      shippingAddress: `${selectedAddress.street}${selectedAddress.subAddress ? `, ${selectedAddress.subAddress}` : ''} (${selectedAddress.label})`,
      notes: `Pago procesado vía: ${selectedPayment.provider.toUpperCase()} (•••• ${selectedPayment.lastFour})`,
      totalPrice: total,
      items: cartItems.map(item => ({
        id: item.id,
        itemName: item.name,
        itemCountAmount: item.quantity || 1,
        itemTotalCost: item.price * (item.quantity || 1)
      })),
      proofOfDelivery: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendOrderPayload)
      });

      if (response.ok) {
        alert(`¡Pedido Confirmado! Procesando pago vía: ${selectedPayment.provider.toUpperCase()}`);
        router.push('/order-tracking');
      } else {
        const errorData = await response.json();
        alert(`Error al guardar el pedido: ${errorData.error || 'Server Side Error'}`);
      }
    } catch (err) {
      console.error('Fatal network checkout exception:', err);
      alert('Error de conexión con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Kept your clean layout wrapper structure completely untouched
    <main className={styles.mainContainer}>
      <div className={styles.desktopGrid}>
        
        <div className={styles.leftColumn}>
          {/* Delivers arrays and tracks selected references */}
          <DeliverySection 
            savedAddresses={user.address || []} 
            selectedAddressId={selectedAddress?.id || null}
            onSelectAddress={(addr) => setSelectedAddress(addr)}
          />
          
          <PaymentSection 
            savedPayments={user.payments || []}
            selectedPaymentId={selectedPayment?.id || null}
            onSelectPayment={(pay) => setSelectedPayment(pay)}
          />
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