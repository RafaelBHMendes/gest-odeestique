import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AppContextType {
  editingProductId: number | null;
  setEditingProductId: (id: number | null) => void;
  startEditingProduct: (id: number) => void;
  stopEditingProduct: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const startEditingProduct = useCallback((id: number) => {
    setEditingProductId(id);
  }, []);

  const stopEditingProduct = useCallback(() => {
    setEditingProductId(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        editingProductId,
        setEditingProductId,
        startEditingProduct,
        stopEditingProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

