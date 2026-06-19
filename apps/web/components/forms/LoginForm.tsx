import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import EyeIcon from '../svgs/EyeIcon';
import EyeOffIcon from '../svgs/EyeOffIcon';

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  onSignUp?: () => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm = ({ onSubmit, onSignUp, isLoading = false, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Header - Bienvenido */}
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Bienvenido!</h2>
      </div>

      {/* Email Input */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo
        </label>
        <input
          id="email"
          type="email"
          placeholder="@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          disabled={isLoading}
        />
      </div>

      {/* Password Input */}
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            disabled={isLoading}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOffIcon color="#666666" />
            ) : (
              <EyeIcon color="#666666" />
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Forgot Password Link */}
      <div className={styles.forgotPasswordContainer}>
        <a href="#" className={styles.forgotPasswordLink}>
          Olvidaste tu contraseña?
        </a>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>

      {/* Sign Up Button */}
      <button 
        type="button"
        className={styles.signUpButton}
        onClick={onSignUp}
        disabled={isLoading}
      >
        👤 Hazte Cliente
      </button>
    </form>
  );
};

export default LoginForm;
