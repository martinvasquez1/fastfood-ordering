'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../app/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
        router.push('/auth/sign-in');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!isAuthenticated) {
    return <p>Redirigiendo...</p>;
  }

  return <>{children}</>;
}