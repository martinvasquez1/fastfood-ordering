'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '../../common/forms/LoginForm';

export default function SignInPage() {
  const router = useRouter();
  const handleLogin = (email: string, password: string) => {
    console.log(email, password);
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