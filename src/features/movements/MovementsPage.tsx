import { useState, useMemo } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { MovementTypeFilter } from '../../types';
import { formatDateTime } from '../../lib/utils';
import { EmptyState } from '../../components/EmptyState';

export function MovementsPage() {
  const { movements } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<MovementTypeFilter>('');

  const filteredMovements = useMemo(() => {
    let filtered = movements;

    if (searchTerm) {
      filtered = filtered.filter((m) =>
        m.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((m) => m.type === typeFilter);
    }

    return filtered;
  }, [movements, searchTerm, typeFilter]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 Histórico de Movimentações</h2>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="🔍 Buscar por produto..."
              className="input input-bordered flex-1 min-w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select select-bordered"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as MovementTypeFilter)}
            >
              <option value="">Todos os tipos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
          </div>

          {filteredMovements.length === 0 ? (
            <EmptyState
              icon="📊"
              title="Nenhuma movimentação encontrada"
              message={
                searchTerm || typeFilter
                  ? 'Tente ajustar os filtros'
                  : 'As movimentações de estoque aparecerão aqui'
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Produto</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Estoque Anterior</th>
                    <th>Estoque Novo</th>
                    <th>Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovements.map((movement) => (
                    <tr key={movement.id}>
                      <td>{formatDateTime(movement.timestamp)}</td>
                      <td>
                        <strong>{movement.productName}</strong>
                      </td>
                      <td>
                        {movement.type === 'entrada' ? (
                          <span className="badge badge-success">➕ Entrada</span>
                        ) : (
                          <span className="badge badge-error">➖ Saída</span>
                        )}
                      </td>
                      <td>
                        <strong>{movement.quantity}</strong>
                      </td>
                      <td>{movement.previousStock}</td>
                      <td>{movement.newStock}</td>
                      <td className="text-sm">{movement.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

