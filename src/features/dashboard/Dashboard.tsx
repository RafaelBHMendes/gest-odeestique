import { useMemo } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { DashboardCard } from '../../components/DashboardCard';
import { formatCurrency } from '../../lib/utils';

export function Dashboard() {
  const { products, getProductsNeedingRestock } = useInventory();

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStock = getProductsNeedingRestock().length;

    return {
      totalProducts,
      totalValue,
      totalStock,
      lowStock,
    };
  }, [products, getProductsNeedingRestock]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <DashboardCard
        title="Total de Produtos"
        value={metrics.totalProducts}
        label="itens cadastrados"
      />
      <DashboardCard
        title="Valor Total do Estoque"
        value={formatCurrency(metrics.totalValue)}
        label="valor estimado"
      />
      <DashboardCard
        title="Estoque Total"
        value={metrics.totalStock}
        label="unidades"
      />
      <DashboardCard
        title="Alerta de Estoque"
        value={metrics.lowStock}
        label="produtos com estoque baixo"
        warning
      />
    </div>
  );
}

