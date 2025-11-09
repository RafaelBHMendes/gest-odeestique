// Cliente HTTP preparado para integração com backend
// Por enquanto, retorna erro informando que o backend não está configurado

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Placeholder para quando o backend estiver disponível
// Substituir por implementação real com Axios/Fetch

export const apiClient = {
  get: async <T>(_url: string, _params?: unknown): Promise<T> => {
    void _url;
    void _params;
    throw new ApiError(
      'Backend não configurado. Configure VITE_API_URL e implemente o cliente HTTP.',
      503
    );
  },
  post: async <T>(_url: string, _data?: unknown): Promise<T> => {
    void _url;
    void _data;
    throw new ApiError(
      'Backend não configurado. Configure VITE_API_URL e implemente o cliente HTTP.',
      503
    );
  },
  put: async <T>(_url: string, _data?: unknown): Promise<T> => {
    void _url;
    void _data;
    throw new ApiError(
      'Backend não configurado. Configure VITE_API_URL e implemente o cliente HTTP.',
      503
    );
  },
  delete: async (_url: string): Promise<void> => {
    void _url;
    throw new ApiError(
      'Backend não configurado. Configure VITE_API_URL e implemente o cliente HTTP.',
      503
    );
  },
};

// TODO: Quando backend estiver pronto, implementar assim:
/*
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para autenticação
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      throw new ApiError(
        error.response.data?.message || 'Erro na requisição',
        error.response.status,
        error.response.data
      );
    }
    throw new ApiError('Erro de conexão', 0);
  }
);

export { apiClient };
*/

