import { useEffect } from 'react';
import { AlertType } from '../types';

interface AlertProps {
  message: string;
  type: AlertType;
  onClose: () => void;
  duration?: number;
}

export function Alert({ message, type, onClose, duration = 3000 }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
  const icon = type === 'success' ? '✅' : '⚠️';

  return (
    <div className={`alert ${alertClass} shadow-lg`}>
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}

