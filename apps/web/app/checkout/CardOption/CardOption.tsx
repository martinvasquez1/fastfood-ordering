import React from 'react';
import styles from './CardOption.module.css';
import CheckCircleIcon from '../../common/svgs/CheckCircleIcon';

interface CardOptionProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const CardOption = ({ title, subtitle, icon, isActive, onClick }: CardOptionProps) => {
  return (
    <div 
      className={`${styles.cardWrapper} ${isActive ? styles.activeCard : ''}`} 
      onClick={onClick}
      role="radio"
      aria-checked={isActive}
      tabIndex={0}
    >
      {/* Left Icon */}
      {icon && <div className={styles.iconLeft}>{icon}</div>}

      {/* Middle Content Stack */}
      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>

      {/* Right Selection Circle/Icon - Only shows when active */}
      {isActive ? (
        <div className={styles.iconRight} aria-hidden="true">
          <CheckCircleIcon size={20} color="#0035C5" />
        </div>
      ) : (
        /* Hidden placeholder box to keep spacing consistent when inactive */
        <div className={styles.iconRightPlaceholder} />
      )}
    </div>
  );
};

export default CardOption;