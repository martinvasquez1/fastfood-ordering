// app/delivery-dashboard/DeliveryDetailsPanel/DeliveryDetailsPanel.tsx
'use client';

import React from 'react';
import styles from './DeliveryDetailsPanel.module.css';
import { OrderPayloadContract } from '../../types/order';

interface DeliveryDetailsPanelProps {
  order: OrderPayloadContract;
  onClose: () => void;
}

export const DeliveryDetailsPanel = ({ order, onClose }: DeliveryDetailsPanelProps) => {
  return (
    <div className={styles.detailsPanelWrapper}>
      <div className={styles.panelHeaderRow}>
        {/* Dynamically references your real database order ID tracking field */}
        <h2 className={styles.panelHeadingText}>Resumen Pedido #{order.id}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div className={styles.metaDataStack}>
        <span className={styles.metaLabelText}>Cliente y Dirección:</span>
        <p className={styles.metaValueText}>
          <strong>{order.user.username}</strong><br />
          {order.shippingAddress}
        </p>
        {order.notes && (
          <>
            <span className={styles.metaLabelText} style={{ marginTop: '8px', display: 'block' }}>Notas:</span>
            <p className={styles.metaValueText} style={{ fontStyle: 'italic' }}>{order.notes}</p>
          </>
        )}
      </div>

      <div className={styles.itemsBreakdownSection}>
        <span className={styles.metaLabelText}>Artículos del Carrito:</span>
        <div className={styles.itemsListContainer}>
          {/* Loops directly through your true backend basket contents payload */}
          {order.items.map((item) => (
            <div key={item.id} className={styles.itemRowLine}>
              <span className={styles.qtyIndicator}>{item.itemCountAmount}x</span>
              <span className={styles.itemName}>{item.itemName}</span>
              <span className={styles.itemPrice}>${item.itemTotalCost.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerSummaryBlock}>
        <span className={styles.totalLabel}>Ganancia Estimada:</span>
        {/* Calculates the clean 15% payout split dynamically based on final cost profiles */}
        <span className={styles.grandTotalValue}>
          ${(order.totalPrice * 0.15).toFixed(2)}
        </span>
      </div>
    </div>
  );
};