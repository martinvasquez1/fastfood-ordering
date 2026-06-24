'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import styles from './header.module.css';
import Modal from '../modal/Modal';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import { signIn } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menú' },
  { href: '#', label: 'Mis órdenes' },
  { href: '#', label: 'Portal Repartidores', type: 'driver' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, login, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDriverLoginOpen, setIsDriverLoginOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    if (href === '#') {
      return false;
    }

    return pathname?.startsWith(href);
  };

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const { accessToken, userId } = await signIn(email, password);
      const username = email.split('@')[0] ?? '';

      login({
        id: userId,
        name: username,
        email,
        token: accessToken,
      });

      setIsLoginOpen(false);
      setIsDriverLoginOpen(false);
      setShowRegister(false);
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : 'No se pudo iniciar sesión.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    setShowRegister(true);
    setIsLoginOpen(true);
    setIsDriverLoginOpen(false);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  const handleClose = () => {
    setIsLoginOpen(false);
    setIsDriverLoginOpen(false);
    setShowRegister(false);
  };

  const openDriverLogin = () => {
    setIsDriverLoginOpen(true);
    setIsLoginOpen(false);
    setShowRegister(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>PapaPita</div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            item.type === 'driver' ? (
              <a
                key={item.label}
                href={item.href}
                className={styles.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  openDriverLogin();
                }}
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={isActive(item.href) ? styles.active : undefined}
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {isAuthenticated && user ? (
          <div className={styles.userInfo}>
            <span className={styles.welcomeText}>Hola, {user.name}</span>
            <button
              type="button"
              className={styles.logoutButton}
              onClick={() => {
                logout();
                router.push('/');
              }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={styles.loginButton}
            onClick={() => setIsLoginOpen(true)}
          >
            <User size={18} />
            <span>Iniciar sesión</span>
          </button>
        )}
      </header>

      <Modal
        isOpen={isLoginOpen}
        onClose={handleClose}
        title={showRegister ? 'Crear cuenta' : 'Iniciar sesión'}
      >
        {showRegister ? (
          <RegisterForm onBack={handleBackToLogin} onComplete={handleClose} />
        ) : (
          <LoginForm
            onSubmit={handleLogin}
            onSignUp={handleSignUp}
            isLoading={isLoading}
            error={error ?? undefined}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDriverLoginOpen}
        onClose={handleClose}
        title="Portal Repartidores"
      >
        <LoginForm onSubmit={handleLogin} showSignUp={false} />
      </Modal>
    </>
  );
}
