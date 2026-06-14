'use client';
import React from 'react';
import styles from './FryLevelTracker.module.css';
import FryProgressBar from './FryProgressBar/FryProgressBar';
import FryStepLabels from './FryStepLabels/FryStepLabels';

interface FryLevelTrackerProps {
  currentStep: number; // 0, 1, 2, or 3
  title?: string;
}

export default function FryLevelTracker({ currentStep, title = "Estado de tu pedido" }: FryLevelTrackerProps) {
  return (
    <div className={styles.trackerContainer}>
      <div className={styles.innerStack}>
        <div className={styles.heading3}>
          <h3 className={styles.titleText}>
            {title}
          </h3>
        </div>
        {/* Component 1: The 12px High Segments Track Bar */}
        <FryProgressBar currentStep={currentStep} />
        
        {/* Component 2: The Centered Uniform Step Icons & Text Labels */}
        <FryStepLabels currentStep={currentStep} />
        
      </div>
    </div>
  );
}