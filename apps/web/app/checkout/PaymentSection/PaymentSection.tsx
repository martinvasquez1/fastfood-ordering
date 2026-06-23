// components/PaymentSection.tsx
'use client';

import React, { useState } from 'react';
import styles from './PaymentSection.module.css';
import CardOption from '../CardOption/CardOption';
import CreditCardIcon from '../../../components/svgs/CreditCardIcon';
import CardStackIcon from '../../../components/svgs/CardStackIcon';

interface PaymentMethodModel {
  id: string;
  provider: string;   // e.g., "Visa", "MasterCard"
  lastFour: string;   // e.g., "4421"
  methodType: string; // e.g., "credit_card"
}

interface PaymentSectionProps {
  savedPayments: PaymentMethodModel[];
  selectedPaymentId: string | null;
  onSelectPayment: (payment: PaymentMethodModel) => void;
}

export const PaymentSection = ({
  savedPayments,
  selectedPaymentId,
  onSelectPayment,
}: PaymentSectionProps) => {
  return (
    <section className={styles.paymentContainer}>
      {/* Header Row Block — Kept exactly as your design */}
      <div className={styles.headerRow}>
        <div className={styles.headerIcon}>
          <CardStackIcon size={24} color="#000000" />
        </div>
        <h2 className={styles.headingText}>Payment Method</h2>
      </div>

      {/* Stacked list of interactive options — Maps live array elements */}
      <div className={styles.optionsStack}>
        {savedPayments.length === 0 ? (
          <div style={{ padding: '16px 0', color: '#71717A' }}>
            <span>No tienes métodos de pago guardados...</span>
          </div>
        ) : (
          savedPayments.map((pay) => {
            const isSelected = selectedPaymentId === pay.id;

            return (
              <CardOption
                key={pay.id}
                title={pay.provider}
                subtitle={`${pay.provider.toUpperCase()} ending in ${pay.lastFour}`}
                icon={
                  pay.methodType === 'paypal' ? (
                    <div style={{ width: 20, height: 16, background: '#003087', borderRadius: '2px' }} />
                  ) : (
                    <CreditCardIcon />
                  )
                }
                isActive={isSelected}
                onClick={() => onSelectPayment(pay)}
              />
            );
          })
        )}
      </div>
    </section>
  );
};