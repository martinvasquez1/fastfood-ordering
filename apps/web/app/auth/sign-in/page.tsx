'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '../../../components/forms/LoginForm';
import Modal from '../../../components/modal/Modal';
import { useAuth } from '../../../context/AuthContext';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
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
    router.push('/auth/sign-up');
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <Modal isOpen={true} onClose={handleClose} title="Iniciar sesión">
      <LoginForm onSubmit={handleLogin} onSignUp={handleSignUp} />
    </Modal>
  );
}