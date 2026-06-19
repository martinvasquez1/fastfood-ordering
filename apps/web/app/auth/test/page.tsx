'use client';

import { useAuth } from '../../context/AuthContext';
import AuthGuard from '../../../components/auth/AuthGuard';

export default function AuthTestPage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AuthGuard>
        <div
        style={{
            padding: '40px',
            fontFamily: 'sans-serif',
        }}
        >
        <h1>Auth Test</h1>

        <p>
            <strong>Authenticated:</strong>{' '}
            {isAuthenticated ? 'Yes' : 'No'}
        </p>

        <p>
            <strong>User:</strong>{' '}
            {user ? user.email : 'No user'}
        </p>

        {isAuthenticated && (
            <button onClick={logout}>
            Logout
            </button>
        )}
        </div>
    </AuthGuard>
  );
}