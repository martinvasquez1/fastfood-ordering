// components/OrderCheckCard.tsx
import React from 'react';
import styles from './OrderCheckCard.module.css';
import Checkpaper from '../../common/svgs/CheckPaper';

interface CheckItem {
  id: string;
  label: string;
  value: string;
}

interface OrderCheckCardProps {
  title?: string;
  checks?: CheckItem[];
  subLabelLeft?: string;
  subLabelRight?: string;
  totalLabelLeft?: string;
  totalLabelRight?: string;
  imageUrl?: string;
}

export const OrderCheckCard = ({
  title = "Order Check",
  checks = [
    { id: '1', label: 'Verificación de cocina', value: 'OK' },
    { id: '2', label: 'Asignación de Repartidor', value: 'Listo' }
  ],
  subLabelLeft = "Tiempo estimado",
  subLabelRight = "15 min",
  totalLabelLeft = "Estado",
  totalLabelRight = "PROCESADO",
}: OrderCheckCardProps) => {
  return (
    <div className={styles.cardWrapper}>
      {/* Upper Content Group */}
      <div className={styles.mainContentContainer}>
        
        {/* Header Block Row */}
        <div className={styles.headerRow}>
          <div className={styles.titleIcon}>
            <Checkpaper />
          </div>
          <h3 className={styles.headingText}>{title}</h3>
        </div>

        {/* Dynamic Dashed Parameters List */}
        <div className={styles.parametersStack}>
          {checks.map((item) => (
            <div key={item.id} className={styles.dashedLineItem}>
              <span className={styles.paramLabel}>{item.label}</span>
              <span className={styles.paramValue}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Lower Metric Info Breakdown Block */}
        <div className={styles.calculationStack}>
          <div className={styles.subRow}>
            <span className={styles.subText}>{subLabelLeft}</span>
            <span className={styles.subText}>{subLabelRight}</span>
          </div>
          <div className={styles.subRow} style={{ paddingTop: '4px' }}>
            <span className={styles.accentTotalText}>{totalLabelLeft}</span>
            <span className={styles.accentTotalText}>{totalLabelRight}</span>
          </div>
        </div>

      </div>

      {/* Product Card Showcase Image Block */}
      {/* <div className={styles.imageMarginContainer}>
        <div 
          className={styles.gourmetFriesImage} 
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label="Gourmet Fries Visual Asset representation"
        />
      </div>
      */}
    </div>
  );
};