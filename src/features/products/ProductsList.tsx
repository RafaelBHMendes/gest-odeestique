import { useState, useMemo } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { SortColumn, SortDirection, StockFilter } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { StockBadge } from '../../components/StockBadge';
import { EmptyState } from '../../components/EmptyState';

interface ProductsListProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ProductsList({ onEdit, onDelete }: ProductsListProps) {
  const { products } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState<StockFilter>('');
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !categoryFilter || product.category === categoryFilter;

      let matchesStock = true;
      if (stockFilter === 'low') matchesStock = product.stock < 10;
      if (stockFilter === 'medium') matchesStock = product.stock >= 10 && product.stock <= 50;
      if (stockFilter === 'high') matchesStock = product.stock > 50;

      return matchesSearch && matchesCategory && matchesStock;
    });

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aVal: string | number = a[sortColumn];
        let bVal: string | number = b[sortColumn];

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = (bVal as string).toLowerCase();
        }

        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [products, searchTerm, categoryFilter, stockFilter, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) return '⇅';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  if (filteredAndSortedProducts.length === 0 && products.length === 0) {
    return (
      <EmptyState
        icon="📦"
        title="Nenhum produto cadastrado"
        message="Adicione produtos manualmente ou importe um arquivo CSV"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="🔍 Buscar produtos..."
          className="input input-bordered flex-1 min-w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as StockFilter)}
        >
          <option value="">Todos os estoques</option>
          <option value="low">Estoque Baixo (&lt;10)</option>
          <option value="medium">Estoque Médio (10-50)</option>
          <option value="high">Estoque Alto (&gt;50)</option>
        </select>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <EmptyState
          icon="📦"
          title="Nenhum produto encontrado"
          message="Tente ajustar os filtros"
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="cursor-pointer">
                  Produto {getSortIcon('name')}
                </th>
                <th onClick={() => handleSort('sku')} className="cursor-pointer">
                  SKU {getSortIcon('sku')}
                </th>
                <th onClick={() => handleSort('category')} className="cursor-pointer">
                  Categoria {getSortIcon('category')}
                </th>
                <th onClick={() => handleSort('price')} className="cursor-pointer">
                  Preço {getSortIcon('price')}
                </th>
                <th onClick={() => handleSort('stock')} className="cursor-pointer">
                  Estoque {getSortIcon('stock')}
                </th>
                <th>Estoque Mín.</th>
                <th>Status</th>
                <th>Valor Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedProducts.map((product) => (
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
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>{product.minStock || 10}</td>
                  <td>
                    <StockBadge stock={product.stock} minStock={product.minStock || 10} />
                  </td>
                  <td>
                    <strong>{formatCurrency(product.price * product.stock)}</strong>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => onEdit(product.id)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => onDelete(product.id)}
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

