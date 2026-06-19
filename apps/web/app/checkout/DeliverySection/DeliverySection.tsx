// components/DeliverySection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styles from './DeliverySection.module.css';
import AddressCard from '../AddressCard/AddressCard';
import DeliveryScooterIcon from '../../../components/svgs/DeliveryScooterIcon';

interface AddressData {
  label: string;
  street: string;
  subAddress: string;
}

interface DeliverySectionProps {
  onAddressLoaded: (address: AddressData) => void; // Call this to inform page.tsx
}

const FALLBACK_ADDRESS: AddressData = {
  label: "Home",
  street: "123 Fry Street, Gourmet Valley",
  subAddress: "Apartment 4B, Blue Building"
};

const DeliverySection = ({ onAddressLoaded }: DeliverySectionProps) => {
  const [address, setAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/address')
      .then((res) => res.json())
      .then((data: AddressData) => {
        setAddress(data);
        onAddressLoaded(data); // Push real data to payload manager
        setLoading(false);
      })
      .catch(() => {
        // Fallback configuration if API fails or is offline
        setAddress(FALLBACK_ADDRESS);
        onAddressLoaded(FALLBACK_ADDRESS); // Push fallback data to payload manager
        setLoading(false);
      });
  }, [onAddressLoaded]);

  return (
    <section className={styles.deliveryContainer}>
      {/* Header Block */}
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={styles.headerIcon}>
            <DeliveryScooterIcon size={20} color="#000000" />
          </div>
          <h2 className={styles.headingText}>Delivery</h2>
        </div>
        <button className={styles.actionButton}>Change</button>
      </div>

      {/* Grid wrapper holding rendered card blocks */}
      <div className={styles.cardsGrid}>
        {loading ? (
          <div style={{ height: 116, display: 'flex', alignItems: 'center' }}>
            <span>Loading address configurations...</span>
          </div>
        ) : (
          <AddressCard
            label={address!.label}
            street={address!.street}
            subAddress={address!.subAddress}
          />
        )}

        {/* Secondary Dashed Edit Card specified in design specs */}
        <button className={styles.editPlaceholderCard}>
          <div className={styles.placeholderIcon} aria-hidden="true" />
          <span className={styles.placeholderText}>Editar direccion</span>
        </button>
      </div>
    </section>
  );
};

export default DeliverySection;