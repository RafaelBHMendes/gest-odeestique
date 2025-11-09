interface DashboardCardProps {
  title: string;
  value: string | number;
  label: string;
  warning?: boolean;
}

export function DashboardCard({ title, value, label, warning }: DashboardCardProps) {
  return (
    <div className={`card bg-base-100 shadow-md ${warning ? 'border-l-4 border-warning' : ''}`}>
      <div className="card-body">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
          {title}
        </h3>
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-base-content/60">{label}</div>
      </div>
    </div>
  );
}

