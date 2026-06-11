import React from 'react';
import styles from './LoginButton.module.css';

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <button className={styles.loginButton} type="button" onClick={onClick}>
      Iniciar Sesión
    </button>
  );
};

export default LoginButton;
