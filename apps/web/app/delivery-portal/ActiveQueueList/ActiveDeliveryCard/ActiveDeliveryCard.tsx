// components/ActiveDeliveryCard/ActiveDeliveryCard.tsx
import React from 'react';
import styles from './ActiveDeliveryCard.module.css';

interface ActiveDeliveryCardProps {
  title: string;
  deliveryDetails: string;
  payout: string;
  onViewDetails: () => void;
  onActionComplete: () => void;
}

export const ActiveDeliveryCard = ({
  title,
  deliveryDetails,
  payout,
  onViewDetails,
  onActionComplete
}: ActiveDeliveryCardProps) => {
  return (
    <div className={styles.activeCardWrapper}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <span className={styles.payoutBadge}>{payout}</span>
      </div>
      
      <p className={styles.detailsText}>{deliveryDetails}</p>

      <div className={styles.actionFooter}>
        {/* New Details Trigger Action */}
        <button 
          type="button" 
          onClick={onViewDetails} 
          className={styles.detailsButton}
        >
          Ver Detalles
        </button>
        
        <button 
          type="button" 
          onClick={onActionComplete} 
          className={styles.completeButton}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};