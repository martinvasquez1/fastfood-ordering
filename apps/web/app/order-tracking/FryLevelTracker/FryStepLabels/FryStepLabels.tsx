// app/order-tracking/components/FryStepLabels.tsx
'use client';
import React from 'react';
import styles from './FryStepLabels.module.css';

interface FryStepLabelsProps {
  currentStep: number;
}

export default function FryStepLabels({ currentStep }: FryStepLabelsProps) {
  const stepsData = [
    { label: 'Orden Recibida', isFlag: false },
    { label: 'Cocina', isFlag: false },
    { label: 'Reparto', isFlag: false },
    { label: 'Entregado', isFlag: true }
  ];

  return (
    <div className={styles.container}>
      {stepsData.map((step, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = index <= currentStep;

        return (
          /* Every step item now renders identically with the clean uniform stepWrapper styling */
          <div key={index} className={styles.stepWrapper}>
            
            {/* Top Badge Node */}
            <div className={styles.iconMarginWrapper}>
              <div className={`${styles.iconCircle} ${!isCompleted ? styles.iconCircleInactive : ''}`}>
                <div className={styles.iconInnerContainer}>
                  <div className={`
                    ${step.isFlag ? styles.innerIconFlag : styles.innerIconCheck} 
                    ${!isCompleted ? styles.innerIconInactive : ''}
                  `} />
                </div>
              </div>
            </div>

            {/* Bottom Text Label */}
            <div className={styles.textContainer}>
              <span className={`${styles.stepText} ${isCurrent ? styles.stepTextActive : ''}`}>
                {step.label}
              </span>
            </div>

          </div>
        );
      })}
    </div>
  );
}