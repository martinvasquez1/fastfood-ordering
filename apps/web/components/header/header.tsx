'use client';

import Link from 'next/link';
import { User } from 'lucide-react';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        PapaPita
      </div>

      <nav className={styles.nav}>
        <a href="/" className={styles.active}>
          Home
        </a>

        <a href="/menu">
          Menú
        </a>

        <a href="#">
          Mis órdenes
        </a>

        <a href="#">
          Portal Repartidores
        </a>
      </nav>

      <Link
        href="/auth/sign-in"
        className={styles.loginButton}
     >
        <User size={18} />
        <span>Iniciar sesión</span>
      </Link>
    </header>
  );
}