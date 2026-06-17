// components/TitleSection/TitleSection.tsx
import React from 'react';
import styles from './TitleSection.module.css';

interface TitleSectionProps {
  title: string;
  subtitle: string;
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Slot to pass your pre-existing SVG icons safely
}

export const TitleSection = ({ title, subtitle, IconComponent }: TitleSectionProps) => {
  return (
    <header className={styles.titleSectionWrapper}>
      
      {/* 1. Top Element: Round Yellow Brand Badge */}
      <div className={styles.badgeContainer}>
        <div className={styles.innerIconWrapper}>
          <IconComponent />
        </div>
      </div>

      {/* 2. Middle Element: Primary Big Brutalist Heading */}
      <div className={styles.headingContainer}>
        <h1 className={styles.heading1Text}>
          {title}
        </h1>
      </div>

      {/* 3. Base Element: Editorial Label Subtext */}
      <div className={styles.subtitleContainer}>
        <p className={styles.subtitleText}>
          {subtitle}
        </p>
      </div>

    </header>
  );
};