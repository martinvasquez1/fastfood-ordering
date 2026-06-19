'use client';

import { useRouter } from 'next/navigation';
import RegisterForm from '../../../components/forms/RegisterForm';
import Modal from '../../../components/modal/Modal';

export default function SignUpPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const handleBack = () => {
    router.push('/auth/sign-in');
  };

  return (
    <Modal isOpen={true} onClose={handleClose} title="Registrarse">
      <RegisterForm onBack={handleBack} onComplete={handleClose} />
    </Modal>
  );
}