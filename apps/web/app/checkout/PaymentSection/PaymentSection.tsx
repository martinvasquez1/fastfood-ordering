// components/PaymentSection.tsx
'use client';

import React, { useState } from 'react';
import styles from './PaymentSection.module.css';
import CardOption from '../CardOption/CardOption';
import CreditCardIcon from '../../../components/svgs/CreditCardIcon';
import CardStackIcon from '../../../components/svgs/CardStackIcon';

interface PaymentSectionProps {
  onMethodChange?: (method: string) => void; // Added hook for payload capture
}

export const PaymentSection = ({ onMethodChange }: PaymentSectionProps) => {
  // Track which payment option is currently selected
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  
  const handleSelection = (method: string) => {
    setActiveMethod(method);      // 1. Updates the UI locally
    if (onMethodChange) {
      onMethodChange(method);     // 2. Tells the master page for the payload
    }
  };
  return (
    <section className={styles.paymentContainer}>
      {/* Header Row Block */}
      <div className={styles.headerRow}>
        <div className={styles.headerIcon}>
          <CardStackIcon size={24} color="#000000" />
        </div>
        <h2 className={styles.headingText}>Payment Method</h2>
      </div>

      {/* Stacked list of interactive options */}
      <div className={styles.optionsStack}>
        <CardOption 
          title="Credit Card" 
          subtitle="Visa ending in 4421" 
          icon={<CreditCardIcon />}
          isActive={activeMethod === 'card'}
          onClick={() => handleSelection('card')}
        />

        <CardOption 
          title="PayPal" 
          subtitle="Pay with your saved PayPal account" 
          icon={
            <div style={{ width: 20, height: 16, background: '#003087', borderRadius: '2px' }} />
          }
          isActive={activeMethod === 'paypal'}
          onClick={() => handleSelection('paypal')}
        />
      </div>
    </section>
  );
};