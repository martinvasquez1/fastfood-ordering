'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '../../common/forms/LoginForm';
import { useAuth } from '../../context/AuthContext';

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

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm
        onSubmit={handleLogin}
        onSignUp={handleSignUp}
      />
    </div>
  );
}