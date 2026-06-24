'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../../components/forms/LoginForm';
import RegisterForm from '../../../components/forms/RegisterForm';
import Modal from '../../../components/modal/Modal';
import { signIn } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      router.push('/');
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
        <LoginForm
          onSubmit={handleLogin}
          onSignUp={handleSignUp}
          isLoading={isLoading}
          error={error ?? undefined}
        />
      )}
    </Modal>
  );
}