// src/components/OrderButton/OrderButton.jsx
import React from 'react';
import styles from './OrderButton.module.css';

const OrderButton = () => {
  return (
    <button className={styles.orderButton} type="button">
      PLACE ORDER
    </button>
  );
};

export default OrderButton;