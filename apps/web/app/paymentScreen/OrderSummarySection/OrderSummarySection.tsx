// components/OrderSummarySection.tsx
import React from 'react';
import styles from './OrderSummarySection.module.css';
import OrderItem from '../OrderItem/OrderItem';
import FoodIcon from '../../common/svgs/FoodIcon';
import OrderButton from '../../common/buttons/orderButton';

// Structure for items passed into this summary box
interface CartItem {
  id: string;
  name: string;
  price: number;
  subtitle: string;
}

interface OrderSummarySectionProps {
  items: CartItem[];
  onPlaceOrder?: () => void;
}

const DELIVERY_FEE = 2.50;

export const OrderSummarySection = ({ items, onPlaceOrder }: OrderSummarySectionProps) => {
  
  // 1. Calculate Subtotal dynamically by summing item prices
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  
  // 2. Calculate Total
  const total = subtotal + DELIVERY_FEE;

  // Helper function to format numbers into clean USD currency strings
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <section className={styles.summaryContainer}>
      <h2 className={styles.headingText}>Resumen del pedido</h2>
      
      {/* List items loop */}
      <div className={styles.itemsListStack}>
        {items.map((item) => (
          <OrderItem 
            key={item.id}
            name={item.name}
            price={formatCurrency(item.price)} // Formats number to "$14.50"
            subtitle={item.subtitle}
            icon={<FoodIcon />}
          />
        ))}
      </div>

      {/* Divider */}
      <div className={styles.divider} aria-hidden="true" />

      {/* Math breakdowns calculated automatically */}
      <div className={styles.breakdownStack}>
        <div className={styles.calculationRow}>
          <span className={styles.label}>Subtotal</span>
          <span className={styles.value}>{formatCurrency(subtotal)}</span>
        </div>

        <div className={styles.calculationRow}>
          <span className={styles.label}>Costo de envío</span>
          <span className={styles.value}>{formatCurrency(DELIVERY_FEE)}</span>
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>{formatCurrency(total)}</span>
        </div>
      </div>
      <OrderButton onClick={onPlaceOrder} />
    </section>
  );
};