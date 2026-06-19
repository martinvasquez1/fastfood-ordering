// components/OrderCheckCard.tsx
import React from 'react';
import styles from './OrderCheckCard.module.css';
import Checkpaper from '../../../components/svgs/CheckPaper';

interface OrderLineItem {
  id: string;
  itemName: string;
  itemCountAmount: number;
  itemTotalCost: number;
}

interface OrderCheckCardProps {
  items: OrderLineItem[];
  orderTotalCost: number;
}

export const OrderCheckCard = ({ items, orderTotalCost }: OrderCheckCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.mainContentContainer}>
        
        <div className={styles.headerRow}>
          <div className={styles.titleIcon}>
            <Checkpaper />
          </div>
          <h3 className={styles.headingText}>Resumen de Compra</h3>
        </div>

        {/* Dynamic Pile Up loop remains cleanly unbothered */}
        <div className={styles.parametersStack}>
          {items.map((product) => (
            <div key={product.id} className={styles.dashedLineItem}>
              <div className={styles.productMetaGroup}>
                <span className={styles.itemCountBadge}>{product.itemCountAmount}x</span>
                <span className={styles.paramLabel}>{product.itemName}</span>
              </div>
              <span className={styles.paramValue}>
                {formatCurrency(product.itemTotalCost)}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.calculationStack}>
          <div className={styles.subRow}>
            <span className={styles.accentTotalText}>Total Pedido</span>
            <span className={styles.accentTotalText}>
              {formatCurrency(orderTotalCost)}
            </span>
          </div>
        </div>

      </div>
      {/* 
      <div className={styles.imageMarginContainer}>
        <div 
          className={styles.gourmetFriesImage} 
          style={{ backgroundImage: `url(${productImage || '/images/default-fries.png'})` }}
          role="img"
          aria-label="Summary invoice graphic marker"
        />
      </div>
      */}
    </div>
  );
};