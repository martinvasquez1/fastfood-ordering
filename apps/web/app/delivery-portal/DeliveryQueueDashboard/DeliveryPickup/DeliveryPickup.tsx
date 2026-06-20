// components/DeliveryPickup/DeliveryPickup.tsx
import React from 'react';
import styles from './DeliveryPickup.module.css';
import { DeliveryStartButton } from './DeliveryStartButton/DeliveryStartButton';
import { ScooterIcon } from 'lucide-react';

interface DeliveryPickupProps {
  title: string;             // e.g., "Pedido #1042" or "Recogida"
  deliveryDetails: string;   // e.g., "Marcus Thorne • 882 West Side Ave"
  statusLabel: string;       // e.g., "$12.50" or "Listo"
  buttonLabel: string;       // e.g., "Iniciar"
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ButtonIconComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onStartDelivery?: () => void;
}

export const DeliveryPickup = ({
  title,
  deliveryDetails,
  statusLabel,
  buttonLabel,
  IconComponent,
  ButtonIconComponent = ScooterIcon,
  onStartDelivery
}: DeliveryPickupProps) => {
  return (
    <div className={styles.pickupCardWrapper}>
      <div className={styles.innerLayoutRow}>
        
        {/* 1. Left Element: Rounded Ambient Grey Icon Badge Wrapper */}
        <div className={styles.iconBadge}>
          <div className={styles.badgeIconSlot}>
            <IconComponent />
          </div>
        </div>

        {/* 2. Middle Element: Dynamic Information Typography Stack */}
        <div className={styles.infoTextStack}>
          <div className={styles.headingRow}>
            <h3 className={styles.pickupHeading}>{title}</h3>
          </div>
          <div className={styles.detailsRow}>
            <p className={styles.detailsText}>{deliveryDetails}</p>
          </div>
        </div>

        {/* 3. Right Element Stack: Price/Status Badge paired with DeliveryStartButton */}
        <div className={styles.actionControlGroup}>
          <span className={styles.highlightStatusText}>
            {statusLabel}
          </span>
          
          {/* Nested Child Component */}
          <DeliveryStartButton 
            label={buttonLabel}
            IconComponent={ButtonIconComponent}
            onClick={onStartDelivery}
          />
        </div>

      </div>
    </div>
  );
};