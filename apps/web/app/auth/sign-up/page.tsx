'use client';

import RegisterForm from '../../../components/forms/RegisterForm';

export default function SignUpPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RegisterForm />
    </div>
  );
}