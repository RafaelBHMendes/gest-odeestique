import { useState, useRef } from 'react';
import { useInventory } from '../../hooks/useInventory';
import { parseCSV } from '../../services/csv';

interface ImportPageProps {
  showAlert: (message: string, type: 'success' | 'error') => void;
}

export function ImportPage({ showAlert }: ImportPageProps) {
  const { addProduct } = useInventory();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      showAlert('Por favor, envie um arquivo CSV válido.', 'error');
      return;
    }

    try {
      const text = await file.text();
      const products = parseCSV(text);

      if (products.length === 0) {
        showAlert('Nenhum produto válido foi encontrado no CSV.', 'error');
        return;
      }

      let imported = 0;
      for (const product of products) {
        if (product.name && product.category && product.price > 0 && product.stock >= 0) {
          addProduct(product);
          imported++;
        }
      }

      if (imported > 0) {
        showAlert(`${imported} produto(s) importado(s) com sucesso!`, 'success');
      } else {
        showAlert('Nenhum produto válido foi encontrado no CSV.', 'error');
      }
    } catch (error) {
      showAlert('Erro ao processar arquivo CSV.', 'error');
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Importar Produtos via CSV</h2>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <p className="mb-4 text-base-content/70">
            Faça upload de um arquivo CSV com as colunas:{' '}
            <strong>nome, categoria, preco, estoque</strong>
          </p>

          <div
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-base-300 hover:border-primary'
            }`}
            onClick={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">Arraste um arquivo CSV aqui</h3>
            <p className="text-base-content/60">ou clique para selecionar</p>
          </div>

          <div className="mt-6 p-4 bg-base-200 rounded-lg">
            <h4 className="font-semibold mb-2">📌 Formato esperado do CSV:</h4>
            <pre className="text-sm text-base-content/70 bg-base-100 p-3 rounded overflow-x-auto">
              {`nome,categoria,preco,estoque
Notebook Dell,Eletrônicos,3500.00,15
Mouse Logitech,Periféricos,120.50,45
Cadeira Gamer,Móveis,850.00,8`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

