'use client';
import React from 'react';
import styles from './FryProgressBar.module.css';

interface FryProgressBarProps {
  currentStep: number;
}

export default function FryProgressBar({ currentStep }: FryProgressBarProps) {
  // Total of 4 structural process blocks
  const totalSegments = 4;

  return (
    <div className={styles.progressBarContainer}>
      {Array.from({ length: totalSegments }).map((_, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = index < currentStep;

        // Apply state classes structurally
        let segmentClass = styles.segment;
        if (isCurrent) segmentClass += ` ${styles.segmentActive}`;
        else if (isCompleted) segmentClass += ` ${styles.segmentCompleted}`;

        return (
          <div 
            key={index} 
            className={segmentClass} 
            title={`Etapa de preparación ${index + 1}`}
          />
        );
      })}
    </div>
  );
}