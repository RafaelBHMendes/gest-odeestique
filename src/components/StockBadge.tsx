interface StockBadgeProps {
  stock: number;
  minStock: number;
}

export function StockBadge({ stock, minStock }: StockBadgeProps) {
  if (stock <= minStock) {
    return <span className="badge badge-error">⚠️ Crítico</span>;
  } else if (stock <= minStock * 2) {
    return <span className="badge badge-warning">Atenção</span>;
  } else {
    return <span className="badge badge-success">Normal</span>;
  }
}

