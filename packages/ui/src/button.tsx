"use client";

import { ReactNode } from "react";
import styles from "./button.module.css"

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
};
