// components/ActiveQueueList/ActiveQueueList.tsx
import React from 'react';
import styles from './ActiveQueueList.module.css';
import { ActiveDeliveryCard } from './ActiveDeliveryCard/ActiveDeliveryCard';
import { OrderPayloadContract } from '../../types/order';

// 2. Update props definition to ingest the expanded rich data structure array
interface ActiveQueueListProps {
  orders: OrderPayloadContract[];
  onSelectOrder: (order: OrderPayloadContract) => void;
  onCompleteOrder: (id: string) => void;
}

export const ActiveQueueList = ({ orders, onSelectOrder, onCompleteOrder }: ActiveQueueListProps) => {
  return (
    <div className={styles.activeQueueContainer}>
      {/* Kept your structural title completely intact */}
      <h2 className={styles.columnTitle}>En Trayecto Activo ({orders.length})</h2>
      
      {/* Visual layouts wrapper shell matching your exact CSS grid rules */}
      <div className={styles.activeGridContainer}>
        {orders.length === 0 ? (
          <div className={styles.emptyStateBoxHighlight}>
            Ninguna entrega activa en curso.
          </div>
        ) : (
          orders.map((order) => (
            <ActiveDeliveryCard 
              key={order.id}
              title={`Pedido #${order.id}`}
              /* Dynamically builds text details from your user data schema mapping */
              deliveryDetails={`${order.user.username} • ${order.shippingAddress}`}
              /* Extracts real monetary values (15% payout cut math applied uniformly) */
              payout={`$${(order.totalPrice * 0.15).toFixed(2)}`}
              onViewDetails={() => onSelectOrder(order)}
              onActionComplete={() => onCompleteOrder(order.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};