"use client";

import { ReactNode } from "react";
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive' | 'icon';
    icon?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    icon,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const buttonClassName = `${styles.button} ${styles[variant]} ${className}`;

    return (
        <button className={buttonClassName} {...props}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
}