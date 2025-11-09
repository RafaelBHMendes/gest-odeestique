// Endpoints de movimentações preparados para integração com backend
// Por enquanto, retorna erro informando que o backend não está configurado

import { Movement } from '../../types';
import { apiClient } from './client';

export const movementsApi = {
  // GET /api/movements
  getAll: (params?: { productId?: number; type?: 'entrada' | 'saida' }) =>
    apiClient.get<Movement[]>('/movements', params),

  // GET /api/movements/:id
  getById: (id: number) => apiClient.get<Movement>(`/movements/${id}`),

  // POST /api/movements
  create: (data: Omit<Movement, 'id' | 'timestamp'>) =>
    apiClient.post<Movement>('/movements', data),

  // GET /api/products/:productId/movements
  getByProduct: (productId: number) =>
    apiClient.get<Movement[]>(`/products/${productId}/movements`),
};

// TODO: Quando backend estiver pronto, descomentar e ajustar:
/*
import { Movement } from '../../types';
import { apiClient } from './client';

export const movementsApi = {
  getAll: async (params?: { productId?: number; type?: 'entrada' | 'saida' }) => {
    return apiClient.get<Movement[]>('/movements', { params });
  },

  getById: async (id: number) => {
    return apiClient.get<Movement>(`/movements/${id}`);
  },

  create: async (data: Omit<Movement, 'id' | 'timestamp'>) => {
    return apiClient.post<Movement>('/movements', data);
  },

  getByProduct: async (productId: number) => {
    return apiClient.get<Movement[]>(`/products/${productId}/movements`);
  },
};
*/

