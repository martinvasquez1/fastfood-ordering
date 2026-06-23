// app/delivery-dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './DeliveryQueueDashboard.module.css';
import { DeliveryPickup } from './DeliveryQueueDashboard/DeliveryPickup/DeliveryPickup';
import { ActiveQueueList } from './ActiveQueueList/ActiveQueueList';
import { DeliveryDetailsPanel } from './DeliveryDetailsPanel/DeliveryDetailsPanel';

// Icons tracking your precise local svgs directory locations
import FoodIcon from '../../components/svgs/FoodIcon';
import DeliveryScooterIcon from '../../components/svgs/DeliveryScooterIcon';

interface OrderItem {
  id: string;
  title: string;
  details: string;
  payout: string;
}

export default function DeliveryQueueDashboard() {
  const [availableOrders, setAvailableOrders] = useState<OrderItem[]>([
    { id: 'order-1042', title: 'Pedido #1042', details: 'Marcus Thorne • 882 West Side Ave', payout: '$12.50' },
    { id: 'order-1043', title: 'Pedido #1043', details: 'Elena Rostova • 415 Grand Horizon Blvd', payout: '$18.75' },
    { id: 'order-1044', title: 'Pedido #1044', details: 'Silas Vance • 109 Gourmet Valley Drive', payout: '$9.20' }
  ]);

  const [activeOrders, setActiveOrders] = useState<OrderItem[]>([]);
  
  // NEW STATE: Tracks which order is currently focused for itemized inspection
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const handleStartDeliveryRoute = (orderId: string) => {
    const targetOrder = availableOrders.find(order => order.id === orderId);
    if (!targetOrder) return;

    setAvailableOrders(prev => prev.filter(order => order.id !== orderId));
    setActiveOrders(prev => [...prev, targetOrder]);
  };

  const handleCompleteDelivery = (orderId: string) => {
    // If the order being finalized is currently being viewed in the panel, close it
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }
    setActiveOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const handleSelectOrderForDetails = (order: OrderItem) => {
    setSelectedOrder(order);
  };

  return (
    <main className={styles.dashboardViewport}>
      <div className={styles.dashboardLayoutContainer}>
        
        <header className={styles.screenHeaderGroup}>
          <h1 className={styles.screenTitle}>Panel de Distribución</h1>
          <p className={styles.screenSubtitle}>Gestiona despachos disponibles y controla entregas en curso.</p>
        </header>

        {/* Dynamic Class changes template layout smoothly from 2 cols to 3 cols */}
        <div className={`${styles.workspaceGrid} ${selectedOrder ? styles.hasDetailsOpen : ''}`}>
          
          {/* COLUMN 1: Pending Queue */}
          <div className={styles.columnSection}>
            <h2 className={styles.columnTitle}>Rutas Disponibles ({availableOrders.length})</h2>
            <div className={styles.queueVerticalStack}>
              {availableOrders.length === 0 ? (
                <div className={styles.emptyStateBox}>No hay más rutas disponibles por ahora.</div>
              ) : (
                availableOrders.map((order) => (
                  <DeliveryPickup 
                    key={order.id}
                    title={order.title}
                    deliveryDetails={order.details}
                    statusLabel={order.payout}
                    buttonLabel="Iniciar"
                    IconComponent={FoodIcon}
                    ButtonIconComponent={DeliveryScooterIcon}
                    onStartDelivery={() => handleStartDeliveryRoute(order.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* COLUMN 2: Segregated Active Queue Component with new callback slot */}
          <div className={styles.columnSection}>
            <ActiveQueueList 
              orders={activeOrders}
              onSelectOrder={handleSelectOrderForDetails}
              onCompleteOrder={handleCompleteDelivery}
            />
          </div>

          {/* COLUMN 3: New Conditional Side Panel */}
          {selectedOrder && (
            <div className={styles.columnSection}>
              <DeliveryDetailsPanel 
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            </div>
          )}

        </div>

      </div>
    </main>
  );
}