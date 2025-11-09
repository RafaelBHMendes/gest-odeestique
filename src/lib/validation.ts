import { ProductFormData } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateProduct(data: ProductFormData): ValidationResult {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Nome do produto é obrigatório.');
  }

  if (!data.category || data.category.trim() === '') {
    errors.push('Categoria é obrigatória.');
  }

  if (data.price === undefined || data.price === null) {
    errors.push('Preço é obrigatório.');
  } else if (data.price <= 0) {
    errors.push('O preço deve ser maior que zero.');
  }

  if (data.stock === undefined || data.stock === null) {
    errors.push('Estoque é obrigatório.');
  } else if (data.stock < 0) {
    errors.push('O estoque não pode ser negativo.');
  }

  if (data.minStock === undefined || data.minStock === null) {
    errors.push('Estoque mínimo é obrigatório.');
  } else if (data.minStock < 0) {
    errors.push('O estoque mínimo não pode ser negativo.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateProductUpdate(
  data: Partial<ProductFormData>
): ValidationResult {
  const errors: string[] = [];

  if (data.name !== undefined && data.name.trim() === '') {
    errors.push('Nome do produto não pode ser vazio.');
  }

  if (data.category !== undefined && data.category.trim() === '') {
    errors.push('Categoria não pode ser vazia.');
  }

  if (data.price !== undefined && data.price <= 0) {
    errors.push('O preço deve ser maior que zero.');
  }

  if (data.stock !== undefined && data.stock < 0) {
    errors.push('O estoque não pode ser negativo.');
  }

  if (data.minStock !== undefined && data.minStock < 0) {
    errors.push('O estoque mínimo não pode ser negativo.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

