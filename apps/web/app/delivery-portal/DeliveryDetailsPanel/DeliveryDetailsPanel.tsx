// app/delivery-dashboard/DeliveryDetailsPanel/DeliveryDetailsPanel.tsx
'use client';

import React from 'react';
import styles from './DeliveryDetailsPanel.module.css';

// 1. Match the exact interface structure declared in your dashboard page
interface OrderItem {
  id: string;
  title: string;
  details: string;
  payout: string;
}

// 2. Explicitly define the props to accept the unified object property
interface DeliveryDetailsPanelProps {
  order: OrderItem;
  onClose: () => void;
}

export const DeliveryDetailsPanel = ({ order, onClose }: DeliveryDetailsPanelProps) => {
  // Mock shopping bag contents mapped directly against the selected ID context
  const mockItemsList = [
    { id: 'm1', name: 'Gourmet Fries Super Premium', qty: 2, price: 9.50 },
    { id: 'm2', name: 'Artisanal Beverage Combo', qty: 1, price: 3.00 }
  ];

  return (
    <div className={styles.detailsPanelWrapper}>
      <div className={styles.panelHeaderRow}>
        {/* Safely reading from the order object payload structure */}
        <h2 className={styles.panelHeadingText}>Resumen {order.title}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div className={styles.metaDataStack}>
        <span className={styles.metaLabelText}>Asignado a:</span>
        <p className={styles.metaValueText}>{order.details}</p>
      </div>

      <div className={styles.itemsBreakdownSection}>
        <span className={styles.metaLabelText}>Artículos del Carrito:</span>
        <div className={styles.itemsListContainer}>
          {mockItemsList.map((item) => (
            <div key={item.id} className={styles.itemRowLine}>
              <span className={styles.qtyIndicator}>{item.qty}x</span>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerSummaryBlock}>
        <span className={styles.totalLabel}>Monto Neto:</span>
        <span className={styles.grandTotalValue}>{order.payout}</span>
      </div>
    </div>
  );
};