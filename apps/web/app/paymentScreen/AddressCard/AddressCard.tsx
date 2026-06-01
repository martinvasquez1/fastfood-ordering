// AddressCard.tsx
import React from 'react';
import styles from './AddressCard.module.css';

interface AddressCardProps {
  label: string;
  street: string;
  subAddress: string;
  actionIcon?: React.ReactNode;
}

const AddressCard = ({ label, street, subAddress, actionIcon }: AddressCardProps) => {
  return (
    <div className={styles.addressCard}>
      {/* Top Header Row */}
      <div className={styles.headerRow}>
        <span className={styles.labelTag}>{label}</span>
        {actionIcon ? (
          <div className={styles.actionIcon}>{actionIcon}</div>
        ) : (
          /* Default small square indicator if no custom icon passed */
          <div className={styles.actionIcon} aria-hidden="true" />
        )}
      </div>

      {/* Stacked Address Lines */}
      <div className={styles.bodyBlock}>
        <div className={styles.linePrimary}>{street}</div>
        <div className={styles.lineSecondary}>{subAddress}</div>
      </div>
    </div>
  );
};

export default AddressCard;