import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const RegisterForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div>
        {step === 1 && (
            <form className={styles.form}>
                
                <div className={styles.welcomeSection}>
                <h2 className={styles.welcomeTitle}>
                    Datos Personales
                </h2>
                </div>

                <div className={styles.formGroup}>
                <label className={styles.label}>
                    Nombre Completo
                </label>

                <input
                    className={styles.input}
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                </div>

                <div className={styles.formGroup}>
                <label className={styles.label}>
                    Correo
                </label>

                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div className={styles.formGroup}>
                <label className={styles.label}>
                    Teléfono
                </label>

                <input
                    className={styles.input}
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </div>

                <div className={styles.formGroup}>
                <label className={styles.label}>
                    Contraseña
                </label>

                <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div className={styles.formGroup}>
                <label className={styles.label}>
                    Confirmar Contraseña
                </label>

                <input
                    className={styles.input}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>

                <button
                type="button"
                className={styles.submitButton}
                onClick={() => setStep(2)}
                >
                Siguiente Paso
                </button>

            </form>
        )}

        {step === 2 && (
            <form className={styles.form}>

                <div className={styles.welcomeSection}>
                <h2 className={styles.welcomeTitle}>
                    Dirección de Entrega
                </h2>
                </div>

                <div className={styles.formGroup}>
                <label className={styles.label}>
                    Dirección
                </label>

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
                Siguiente Paso
                </button>

                <button
                type="button"
                className={styles.signUpButton}
                onClick={() => setStep(1)}
                >
                Volver
                </button>

            </form>
        )}

        {step === 3 && (
            <form className={styles.form}>

                <div className={styles.welcomeSection}>
                <h2 className={styles.welcomeTitle}>
                    Método de Pago
                </h2>
                </div>

                <div
                style={{
                    border: '2px dashed #0051CC',
                    padding: '30px',
                    textAlign: 'center',
                    borderRadius: '8px'
                }}
                >
                Añadir Tarjeta
                <br />
                <small>
                    Aquí se conectará el componente de pagos
                </small>
                </div>

                <button
                type="button"
                className={styles.submitButton}
                onClick={() => setStep(4)}
                >
                Finalizar Registro
                </button>

                <button
                type="button"
                className={styles.signUpButton}
                onClick={() => setStep(2)}
                >
                Volver
                </button>

            </form>
        )}

        {step === 4 && (
            <div className={styles.form}>

                <div className={styles.welcomeSection}>
                <h2 className={styles.welcomeTitle}>
                    Inscripción Exitosa
                </h2>
                </div>

                <p
                style={{
                    textAlign: 'center',
                    color: '#666'
                }}
                >
                ¡Disfruta de tu experiencia!
                </p>

                <button
                type="button"
                className={styles.submitButton}
                onClick={() => {
                    router.push('/');
                }}
                >
                Menú →
                </button>

            </div>
        )}
    </div>
  );
};

export default RegisterForm;