import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './LoginForm.module.css';

interface RegisterFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const RegisterForm = ({ onBack, onComplete }: RegisterFormProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      router.push('/');
    }
  };

  const progressSteps = [
    'Cuenta',
    'Dirección',
    'Pago',
    'Finalizar',
  ];

  return (
    <div className={styles.form}>
      <div className={styles.progressHeader}>
        <div>
          <p className={styles.sectionLabel}>Progreso</p>
          <p className={styles.sectionCopy}>Paso {step} de 4</p>
        </div>
        {onBack && (
          <button type="button" className={styles.closeLink} onClick={onBack}>
            Volver
          </button>
        )}
      </div>

      <div className={styles.progressBar}>
        {progressSteps.map((_, index) => (
          <div
            key={index}
            className={`${styles.progressStep} ${index < step ? styles.activeProgress : ''}`}
          />
        ))}
      </div>

      {step === 1 && (
        <form className={styles.form}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>Datos personales</h2>
            <p className={styles.formSubtitle}>
              Completa tu información para empezar a pedir.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre completo</label>
            <input
              className={styles.input}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className={styles.rowInputs}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Correo</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Teléfono</label>
              <input
                className={styles.input}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.rowInputs}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Contraseña</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Confirmar contraseña</label>
              <input
                className={styles.input}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className={styles.submitButton}
            onClick={() => setStep(2)}
          >
            Continuar
          </button>
        </form>
      )}

      {step === 2 && (
        <form className={styles.form}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>Dirección de entrega</h2>
            <p className={styles.formSubtitle}>
              Añade tu dirección para recibir el pedido en el lugar correcto.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Dirección</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Calle, número, comuna..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            type="button"
            className={styles.submitButton}
            onClick={() => setStep(3)}
          >
            Continuar
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setStep(1)}
          >
            Volver
          </button>
        </form>
      )}

      {step === 3 && (
        <form className={styles.form}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>Método de pago</h2>
            <p className={styles.formSubtitle}>
              Selecciona cómo quieres pagar tus pedidos.
            </p>
          </div>

          <div className={styles.paymentPlaceholder}>
            Añadir tarjeta
            <br />
            <small>Aquí se conectará el componente de pagos.</small>
          </div>

          <button
            type="button"
            className={styles.submitButton}
            onClick={() => setStep(4)}
          >
            Finalizar registro
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setStep(2)}
          >
            Volver
          </button>
        </form>
      )}

      {step === 4 && (
        <div className={styles.form}>
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>Registro completado</h2>
          </div>

          <p className={styles.successText}>
            ¡Ya estás listo! Empieza a explorar el menú y haz tu primer pedido.
          </p>

          <button
            type="button"
            className={styles.submitButton}
            onClick={handleComplete}
          >
            Ir al menú
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;