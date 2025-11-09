export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
  sku: string;
  minStock: number;
}

export interface Movement {
  id: number;
  productId: number;
  productName: string;
  type: 'entrada' | 'saida';
  quantity: number;
  reason: string;
  previousStock: number;
  newStock: number;
  timestamp: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  sku?: string;
  minStock: number;
}

export type SortColumn = 'name' | 'category' | 'price' | 'stock' | 'sku';
export type SortDirection = 'asc' | 'desc';

export type StockFilter = 'low' | 'medium' | 'high' | '';
export type MovementTypeFilter = 'entrada' | 'saida' | '';

export type AlertType = 'success' | 'error';

