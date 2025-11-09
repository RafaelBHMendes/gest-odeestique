import { useState, FormEvent } from 'react';
import { ProductFormData } from '../../types';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
  submitLabel?: string;
}

export function ProductForm({
  onSubmit,
  initialData,
  submitLabel = 'Salvar Produto',
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    description: initialData?.description || '',
    sku: initialData?.sku || '',
    minStock: initialData?.minStock || 10,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nome do Produto *</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Categoria *</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Código SKU</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            placeholder="Gerado automaticamente se vazio"
            disabled={!!initialData?.sku}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Estoque Mínimo *</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={formData.minStock}
            onChange={(e) =>
              setFormData({ ...formData, minStock: parseInt(e.target.value, 10) || 10 })
            }
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Preço Unitário (R$) *</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
            }
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Quantidade em Estoque *</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: parseInt(e.target.value, 10) || 0 })
            }
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Descrição</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Informações adicionais sobre o produto..."
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button type="submit" className="btn btn-primary">
          💾 {submitLabel}
        </button>
        <button type="reset" className="btn btn-ghost" onClick={() => setFormData({
          name: '',
          category: '',
          price: 0,
          stock: 0,
          description: '',
          sku: '',
          minStock: 10,
        })}>
          🔄 Limpar
        </button>
      </div>
    </form>
  );
}

