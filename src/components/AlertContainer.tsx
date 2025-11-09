import { Alert } from './Alert';
import { AlertType } from '../types';

interface AlertData {
  id: number;
  message: string;
  type: AlertType;
}

interface AlertContainerProps {
  alerts: AlertData[];
  onRemove: (id: number) => void;
}

export function AlertContainer({ alerts, onRemove }: AlertContainerProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => onRemove(alert.id)}
        />
      ))}
    </div>
  );
}

