// components/DeliveryStartButton/DeliveryStartButton.tsx
import React from 'react';
import styles from './DeliveryStartButton.module.css';

interface DeliveryStartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  IconComponent?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const DeliveryStartButton = ({ 
  label, 
  IconComponent, 
  className, 
  ...props 
}: DeliveryStartButtonProps) => {
  return (
    <button 
      className={`${styles.deliveryStartButtonWrapper} ${className || ''}`} 
      {...props}
    >
      {IconComponent && (
        <div className={styles.buttonIconSlot}>
          <IconComponent />
        </div>
      )}
      
      <span className={styles.deliveryStartButtonText}>
        {label}
      </span>
    </button>
  );
};