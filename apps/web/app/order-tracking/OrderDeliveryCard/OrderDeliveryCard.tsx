// app/order-tracking/OrderDeliveryCard/OrderDeliveryCard.tsx
import React from 'react';
import styles from './OrderDeliveryCard.module.css';
// 1. Swap this path with the exact folder layout location of your existing SVG asset
import MapPointer from '../../../components/svgs/MapPointer';

interface OrderDeliveryCardProps {
  addressLabel: string;
  streetAddress: string;
  apartmentDetails: string;
}

export const OrderDeliveryCard = ({ 
  addressLabel, 
  streetAddress, 
  apartmentDetails 
}: OrderDeliveryCardProps) => {
  return (
    <div className={styles.cardWrapper}>
      
      {/* Header Row Container */}
      <div className={styles.headerRow}>
        {/* Your clean, pre-existing structural icon component asset wrapper */}
        <div className={styles.titleIcon}>
          <MapPointer />
        </div>
        <div className={styles.headingTextContainer}>
          <h3 className={styles.headingText}>Entrega</h3>
        </div>
      </div>

      {/* Main Address Information Content Stack */}
      <div className={styles.addressInfoStack}>
        <div className={styles.textLineContainer}>
          <span className={styles.addressLabelText}>{addressLabel}</span>
        </div>
        <div className={styles.textLineContainer}>
          <span className={styles.detailsText}>{streetAddress}</span>
        </div>
        <div className={styles.textLineContainer}>
          <span className={styles.detailsText}>{apartmentDetails}</span>
        </div>
      </div>

    </div>
  );
};