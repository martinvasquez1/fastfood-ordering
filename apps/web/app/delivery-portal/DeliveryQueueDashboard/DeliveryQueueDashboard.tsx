// app/delivery-dashboard/page.tsx
'use client';

import React from 'react';
import styles from './DeliveryQueueDashboard.module.css';
import { DeliveryPickup } from './DeliveryPickup/DeliveryPickup';

// Pre-existing icon asset imports
import FoodIcon from '../../../components/svgs/FoodIcon';
import DeliveryScooterIcon from '../../../components/svgs/DeliveryScooterIcon';
import { ScooterIcon } from 'lucide-react';

// Mock list tracking incoming distribution data rows
const MOCK_QUEUE_ORDERS = [
  { id: 'order-1042', title: 'Pedido #1042', details: 'Marcus Thorne • 882 West Side Ave', payout: '$12.50' },
  { id: 'order-1043', title: 'Pedido #1043', details: 'Elena Rostova • 415 Grand Horizon Blvd', payout: '$18.75' },
  { id: 'order-1044', title: 'Pedido #1044', details: 'Silas Vance • 109 Gourmet Valley Drive', payout: '$9.20' }
];

export default function DeliveryQueueDashboard() {
  
  const handleStartDeliveryRoute = (orderId: string) => {
    console.log(`Initializing route dispatch loop for ID: ${orderId}`);
  };

  return (
    <main className={styles.dashboardViewport}>
      <div className={styles.dashboardLayoutContainer}>
        
        {/* Screen Header Branding Meta Deck */}
        <header className={styles.screenHeaderGroup}>
          <h1 className={styles.screenTitle}>Rutas Disponibles</h1>
          <p className={styles.screenSubtitle}>Selecciona un pedido listo para iniciar la entrega inmediata</p>
        </header>

        {/* The Live Active Vertical Stack Pipeline */}
        <section className={styles.queueVerticalStack}>
          {MOCK_QUEUE_ORDERS.map((order) => (
            <DeliveryPickup 
              key={order.id}
              title={order.title}
              deliveryDetails={order.details}
              statusLabel={order.payout}
              buttonLabel="Iniciar"
              IconComponent={FoodIcon}
              ButtonIconComponent={ScooterIcon}
              onStartDelivery={() => handleStartDeliveryRoute(order.id)}
            />
          ))}
        </section>

      </div>
    </main>
  );
}