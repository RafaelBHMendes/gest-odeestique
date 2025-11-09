interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className={`loading loading-spinner ${sizeClasses[size]}`}></span>
      {text && <p className="text-base-content/60">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100/80 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

