// OrderItem.tsx
import React from 'react';
import styles from './OrderItem.module.css';

interface OrderItemProps {
  name: string;
  price: string;
  subtitle: string;
  icon?: React.ReactNode;
  quantity: number; // 1. ADD QUANTITY TO THE INTERFACE
}

const OrderItem = ({ name, price, subtitle, icon, quantity }: OrderItemProps) => {
  return (
    <div className={styles.itemRow}>
      {/* Left Icon Thumbnail */}
      <div className={styles.iconContainer}>
        {icon ? icon : <div aria-hidden="true" style={{ width: 14, height: 19, background: '#A1A1AA' }} />}
      </div>

      {/* Right Details Block */}
      <div className={styles.contentBlock}>
        {/* Top line split layout */}
        <div className={styles.headerLine}>
          <span className={styles.itemName}>
            {name}
            {/* 2. RENDER THE MULTIPLIER NEXT TO THE NAME IF IT'S GREATER THAN 0 */}
            {quantity > 0 && (
              <span className={styles.quantityMultiplier} style={{ marginLeft: '8px', color: '#0070F3', fontWeight: 'bold' }}>
                x{quantity}
              </span>
            )}
          </span>
          <span className={styles.itemPrice}>{price}</span>
        </div>

        {/* Bottom line descriptor */}
        <div className={styles.itemSubtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default OrderItem;