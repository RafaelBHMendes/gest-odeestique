import { ProductForm } from './ProductForm';
import { ProductFormData } from '../../types';
import { validateProduct } from '../../lib/validation';
import { useInventory } from '../../hooks/useInventory';

interface AddProductPageProps {
  showAlert: (message: string, type: 'success' | 'error') => void;
}

export function AddProductPage({ showAlert }: AddProductPageProps) {
  const { addProduct } = useInventory();

  const handleSubmit = (data: ProductFormData) => {
    try {
      const validation = validateProduct(data);
      if (!validation.isValid) {
        showAlert(validation.errors[0], 'error');
        return;
      }

      addProduct(data);
      showAlert('Produto adicionado com sucesso!', 'success');
    } catch (error) {
      showAlert('Erro ao adicionar produto.', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Adicionar Novo Produto</h2>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <ProductForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

