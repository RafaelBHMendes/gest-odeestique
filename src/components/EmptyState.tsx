interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="text-center py-16 text-base-content/60">
      <div className="text-6xl mb-4 opacity-30">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{message}</p>
    </div>
  );
}

