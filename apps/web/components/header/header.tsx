'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import styles from './header.module.css';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menú' },
  { href: '#', label: 'Mis órdenes' },
  { href: '#', label: 'Portal Repartidores' },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    if (href === '#') {
      return false;
    }

    return pathname?.startsWith(href);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>PapaPita</div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={isActive(item.href) ? styles.active : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Link href="/auth/sign-in" className={styles.loginButton}>
        <User size={18} />
        <span>Iniciar sesión</span>
      </Link>
    </header>
  );
}