// components/DeliverySection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styles from './DeliverySection.module.css';
import AddressCard from '../AddressCard/AddressCard';
import DeliveryScooterIcon from '../../../components/svgs/DeliveryScooterIcon';

interface AddressModel {
  id: string;
  label: string;
  street: string;
  subAddress?: string;
}

interface DeliverySectionProps {
  savedAddresses: AddressModel[];
  selectedAddressId: string | null;
  onSelectAddress: (address: AddressModel) => void;
}

const DeliverySection = ({ 
  savedAddresses, 
  selectedAddressId, 
  onSelectAddress 
}: DeliverySectionProps) => {
  return (
    <section className={styles.deliveryContainer}>
      {/* Header Block — Left exactly as your original design */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.headerIcon}>
            <DeliveryScooterIcon size={20} color="#000000" />
          </div>
          <h2 className={styles.headingText}>Delivery</h2>
        </div>
        <button className={styles.actionButton}>Change</button>
      </div>

      {/* Grid wrapper holding rendered card blocks — Kept exact design layout */}
      <div className={styles.cardsGrid}>
        {savedAddresses.length === 0 ? (
          <div style={{ height: 116, display: 'flex', alignItems: 'center' }}>
            <span>No hay direcciones guardadas...</span>
          </div>
        ) : (
          savedAddresses.map((addr) => {
            const isSelected = selectedAddressId === addr.id;
            
            return (
              <div 
                key={addr.id}
                onClick={() => onSelectAddress(addr)}
                /* Adds a clean selection class toggle while completely keeping your structure intact */
                className={`${styles.cardSelectionWrapper} ${isSelected ? styles.activeSelectedCard : ''}`}
              >
                <AddressCard
                  label={addr.label}
                  street={addr.street}
                  subAddress={addr.subAddress || ''}
                />
              </div>
            );
          })
        )}

        {/* Secondary Dashed Edit Card specified in design specs — Kept untouched */}
        <button className={styles.editPlaceholderCard}>
          <div className={styles.placeholderIcon} aria-hidden="true" />
          <span className={styles.placeholderText}>Editar direccion</span>
        </button>
      </div>
    </section>
  );
};

export default DeliverySection;