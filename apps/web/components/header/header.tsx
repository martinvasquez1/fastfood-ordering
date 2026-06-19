'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import styles from './header.module.css';
import Modal from '../modal/Modal';
import LoginForm from '../forms/LoginForm';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menú' },
  { href: '#', label: 'Mis órdenes' },
  { href: '#', label: 'Portal Repartidores' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    if (href === '#') {
      return false;
    }

    return pathname?.startsWith(href);
  };

  const handleLogin = (email: string, password: string) => {
    const username = email.split('@')[0] ?? '';
    login({
      id: '1',
      name: username,
      email,
    });
    setIsLoginOpen(false);
  };

  const handleSignUp = () => {
    setIsLoginOpen(false);
    router.push('/auth/sign-up');
  };

  return (
    <>
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

        <button
          type="button"
          className={styles.loginButton}
          onClick={() => setIsLoginOpen(true)}
        >
          <User size={18} />
          <span>Iniciar sesión</span>
        </button>
      </header>

      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Iniciar sesión"
      >
        <LoginForm onSubmit={handleLogin} onSignUp={handleSignUp} />
      </Modal>
    </>
  );
}
