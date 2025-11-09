import { useState, useEffect } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { useApp } from '../../contexts/AppContext';
import { ProductFormData } from '../../types';
import { validateProduct, validateProductUpdate } from '../../lib/validation';
import { ProductsList } from './ProductsList';
import { ProductForm } from './ProductForm';
import { Modal } from '../../components/Modal';
import { Product } from '../../types';

interface ProductsPageProps {
  showAlert: (message: string, type: 'success' | 'error') => void;
}

export function ProductsPage({ showAlert }: ProductsPageProps) {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory();
  const { editingProductId, stopEditingProduct, startEditingProduct } = useApp();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [movementReason, setMovementReason] = useState('');

  // Effects
  useEffect(() => {
    if (editingProductId) {
      const product = products.find((p) => p.id === editingProductId);
      if (product) {
        setEditingProduct(product);
      }
    } else {
      setEditingProduct(null);
      setMovementReason('');
    }
  }, [editingProductId, products]);

  // Handlers
  const handleEdit = (id: number) => {
    startEditingProduct(id);
  };
  const handleAdd = (data: ProductFormData) => {
    try {
      const validation = validateProduct(data);
      if (!validation.isValid) {
        showAlert(validation.errors[0], 'error');
        return;
      }

      addProduct(data);
      showAlert('Produto adicionado com sucesso!', 'success');
      setIsAddModalOpen(false);
    } catch (error) {
      showAlert('Erro ao adicionar produto.', 'error');
    }
  };

  const handleUpdate = (data: ProductFormData & { movementReason?: string }) => {
    if (!editingProduct) return;

    try {
      const validation = validateProductUpdate(data);
      if (!validation.isValid) {
        showAlert(validation.errors[0], 'error');
        return;
      }

      updateProduct(editingProduct.id, { ...data, movementReason });
      showAlert('Produto atualizado com sucesso!', 'success');
      stopEditingProduct();
    } catch (error) {
      showAlert('Erro ao atualizar produto.', 'error');
    }
  };

  const handleDelete = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product && window.confirm(`Deseja realmente excluir o produto "${product.name}"?`)) {
      deleteProduct(id);
      showAlert('Produto excluído com sucesso!', 'success');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          ➕ Adicionar Produto
        </button>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <ProductsList onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Adicionar Novo Produto"
      >
        <ProductForm onSubmit={handleAdd} />
      </Modal>

      <Modal
        isOpen={!!editingProduct}
        onClose={stopEditingProduct}
        title="Editar Produto"
      >
        {editingProduct && (
          <div>
            <ProductForm
              initialData={editingProduct}
              onSubmit={(data) => handleUpdate({ ...data, movementReason })}
              submitLabel="Salvar Alterações"
            />
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">
                  Motivo da Alteração (se houver mudança de estoque)
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Ex: Venda, Devolução, Ajuste de inventário"
                value={movementReason}
                onChange={(e) => setMovementReason(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

