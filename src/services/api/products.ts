// Endpoints de produtos preparados para integração com backend
// Por enquanto, retorna erro informando que o backend não está configurado

import { Product, ProductFormData } from '../../types';
import { apiClient } from './client';

export const productsApi = {
  // GET /api/products
  getAll: (params?: { page?: number; limit?: number; category?: string }) =>
    apiClient.get<Product[]>('/products', params),

  // GET /api/products/:id
  getById: (id: number) => apiClient.get<Product>(`/products/${id}`),

  // POST /api/products
  create: (data: ProductFormData) => apiClient.post<Product>('/products', data),

  // PUT /api/products/:id
  update: (id: number, data: Partial<ProductFormData>) =>
    apiClient.put<Product>(`/products/${id}`, data),

  // DELETE /api/products/:id
  delete: (id: number) => apiClient.delete(`/products/${id}`),
};

// TODO: Quando backend estiver pronto, descomentar e ajustar:
/*
import { Product, ProductFormData } from '../../types';
import { apiClient } from './client';

export const productsApi = {
  getAll: async (params?: { page?: number; limit?: number; category?: string }) => {
    return apiClient.get<Product[]>('/products', { params });
  },

  getById: async (id: number) => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  create: async (data: ProductFormData) => {
    return apiClient.post<Product>('/products', data);
  },

  update: async (id: number, data: Partial<ProductFormData>) => {
    return apiClient.put<Product>(`/products/${id}`, data);
  },

  delete: async (id: number) => {
    return apiClient.delete(`/products/${id}`);
  },
};
*/

