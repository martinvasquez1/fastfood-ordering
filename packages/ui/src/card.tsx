"use client";

import { ReactNode } from "react";
import styles from "./card.module.css"

interface CardProps {
  title: string;
  children: ReactNode;
}

export const Card = ({ title, children }: CardProps ) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}