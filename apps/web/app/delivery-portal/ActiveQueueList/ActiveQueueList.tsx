// components/ActiveQueueList/ActiveQueueList.tsx
import React from 'react';
import styles from './ActiveQueueList.module.css';
import { ActiveDeliveryCard } from './ActiveDeliveryCard/ActiveDeliveryCard';

interface OrderItem {
  id: string;
  title: string;
  details: string;
  payout: string;
}

interface ActiveQueueListProps {
  orders: OrderItem[];
  onSelectOrder: (order: OrderItem) => void;
  onCompleteOrder: (id: string) => void;
}

export const ActiveQueueList = ({ orders, onSelectOrder, onCompleteOrder }: ActiveQueueListProps) => {
  return (
    <div className={styles.activeQueueContainer}>
      <h2 className={styles.columnTitle}>En Trayecto Activo ({orders.length})</h2>
      
      <div className={styles.activeGridContainer}>
        {orders.length === 0 ? (
          <div className={styles.emptyStateBoxHighlight}>
            Ninguna entrega activa en curso.
          </div>
        ) : (
          orders.map((order) => (
            <ActiveDeliveryCard 
              key={order.id}
              title={order.title}
              deliveryDetails={order.details}
              payout={order.payout}
              onViewDetails={() => onSelectOrder(order)}
              onActionComplete={() => onCompleteOrder(order.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};