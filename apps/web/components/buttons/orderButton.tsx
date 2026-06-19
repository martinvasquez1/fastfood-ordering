// src/components/OrderButton/OrderButton.jsx
import React from 'react';
import styles from './OrderButton.module.css';

interface OrderButtonProps {
  onClick?: () => void;
  label: string;
}

const OrderButton = ({ onClick, label }: OrderButtonProps) => {
  return (
    <button className={styles.orderButton} type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default OrderButton;