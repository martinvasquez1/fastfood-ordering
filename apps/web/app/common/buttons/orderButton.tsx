// src/components/OrderButton/OrderButton.jsx
import React from 'react';
import styles from './OrderButton.module.css';

interface OrderButtonProps {
  onClick?: () => void;
}

const OrderButton = ({ onClick }: OrderButtonProps) => {
  return (
    <button className={styles.orderButton} type="button" onClick={onClick}>
      PLACE ORDER
    </button>
  );
};

export default OrderButton;