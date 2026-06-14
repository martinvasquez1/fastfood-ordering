'use client';

import RegisterForm from '../../common/forms/RegisterForm';

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