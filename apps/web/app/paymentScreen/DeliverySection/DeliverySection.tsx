// components/DeliverySection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styles from './DeliverySection.module.css';
import AddressCard from '../AddressCard/AddressCard';
import DeliveryScooterIcon from '../../common/svgs/DeliveryScooterIcon';
interface AddressData {
  label: string;
  street: string;
  subAddress: string;
}

const DeliverySection = () => {
  const [address, setAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/address')
      .then((res) => res.json())
      .then((data: AddressData) => {
        setAddress(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className={styles.deliveryContainer}>
      {/* Dynamic Header Component Block */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
            <div className={styles.headerIcon}>
                <DeliveryScooterIcon size={20} color="#000000" />
            </div>
          <h2 className={styles.headingText}>Delivery</h2>
        </div>
        <button className={styles.actionButton}>Change</button>
      </div>

      {/* Row containing Address details and edit buttons */}
      <div className={styles.cardsGrid}>
        {loading ? (
          <div style={{ height: 116, display: 'flex', alignItems: 'center' }}>
            <span>Loading address configurations...</span>
          </div>
        ) : address ? (
          <AddressCard
            label={address.label}
            street={address.street}
            subAddress={address.subAddress}
          />
        ) : (

            <AddressCard 
                label="Home"
                street="123 Fry Street, Gourmet Valley"
                subAddress="Apartment 4B, Blue Building"
            />

        )}

        {/* Secondary Dashed Edit Card specified in design specs */}

      </div>
    </section>
  );
};

export default DeliverySection;