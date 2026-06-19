'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../../components/forms/LoginForm';
import RegisterForm from '../../../components/forms/RegisterForm';
import Modal from '../../../components/modal/Modal';
import { useAuth } from '../../../context/AuthContext';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const handleLogin = (email: string, password: string) => {
    const username = email.split('@')[0] ?? '';
    login({
      id: '1',
      name: username,
      email,
    });

    router.push('/');
  };

  const handleSignUp = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title={showRegister ? 'Crear cuenta' : 'Iniciar sesión'}
    >
      {showRegister ? (
        <RegisterForm onBack={handleBackToLogin} onComplete={handleClose} />
      ) : (
        <LoginForm onSubmit={handleLogin} onSignUp={handleSignUp} />
      )}
    </Modal>
  );
}