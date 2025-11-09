import { Product, ProductFormData } from '../types';

export function parseCSV(csvContent: string): ProductFormData[] {
  const lines = csvContent.split('\n').filter((line) => line.trim());
  
  if (lines.length < 2) {
    throw new Error('Arquivo CSV vazio ou inválido');
  }

  const products: ProductFormData[] = [];

  // Processar linhas (ignorar header)
  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(',').map((col) => col.trim());
    
    if (columns.length >= 4) {
      products.push({
        name: columns[0],
        category: columns[1],
        price: parseFloat(columns[2]),
        stock: parseInt(columns[3], 10),
        description: columns[4] || '',
        minStock: 10, // Valor padrão
      });
    }
  }

  return products;
}

export function exportToCSV(products: Product[]): string {
  const header = 'nome,categoria,preco,estoque,descricao\n';
  const rows = products.map(
    (p) => `${p.name},${p.category},${p.price},${p.stock},"${p.description}"`
  ).join('\n');
  return header + rows;
}

export function exportToJSON(products: Product[]): string {
  return JSON.stringify(products, null, 2);
}

