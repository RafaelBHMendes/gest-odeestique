import { useInventory } from '../../hooks/useInventory';
import { useApp } from '../../contexts/AppContext';
import { StockBadge } from '../../components/StockBadge';
import { EmptyState } from '../../components/EmptyState';

export function AlertsPage() {
  const { getProductsNeedingRestock } = useInventory();
  const { startEditingProduct } = useApp();
  const needsRestock = getProductsNeedingRestock();

  if (needsRestock.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">⚠️ Alertas de Reposição</h2>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <p className="mb-4 text-base-content/70">
              Produtos que atingiram ou estão abaixo do estoque mínimo configurado
            </p>
            <EmptyState
              icon="✅"
              title="Tudo certo!"
              message="Nenhum produto precisa de reposição no momento"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">⚠️ Alertas de Reposição</h2>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <p className="mb-4 text-base-content/70">
            Produtos que atingiram ou estão abaixo do estoque mínimo configurado
          </p>

          <div className="alert alert-error mb-6">
            <span>⚠️</span>
            <span>
              <strong>{needsRestock.length} produto(s) precisam de reposição!</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>SKU</th>
                  <th>Categoria</th>
                  <th>Estoque Atual</th>
                  <th>Estoque Mínimo</th>
                  <th>Reabastecer</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {needsRestock.map((product) => {
                  const deficit = product.minStock - product.stock;
                  return (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>
                      </td>
                      <td>
                        <code className="text-xs bg-base-200 px-2 py-1 rounded">
                          {product.sku || 'N/A'}
                        </code>
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <strong className="text-error">{product.stock}</strong>
                      </td>
                      <td>{product.minStock}</td>
                      <td>
                        <strong className="text-primary">
                          +{deficit > 0 ? deficit : product.minStock}
                        </strong>
                      </td>
                      <td>
                        <StockBadge stock={product.stock} minStock={product.minStock} />
                      </td>
                      <td>
                        <button
                          className="btn btn-xs btn-primary"
                          onClick={() => startEditingProduct(product.id)}
                        >
                          ✏️ Ajustar Estoque
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

