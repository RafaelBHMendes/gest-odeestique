import { useState, useCallback } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Dashboard } from './features/dashboard/Dashboard';
import { ProductsPage } from './features/products/ProductsPage';
import { AddProductPage } from './features/products/AddProductPage';
import { ImportPage } from './features/import/ImportPage';
import { ExportPage } from './features/export/ExportPage';
import { MovementsPage } from './features/movements/MovementsPage';
import { AlertsPage } from './features/alerts/AlertsPage';
import { Tabs } from './components/Tabs';
import { AlertContainer } from './components/AlertContainer';
import { AlertType } from './types';

type TabId = 'products' | 'add' | 'import' | 'export' | 'movements' | 'alerts';

const TABS: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'products', label: 'Produtos', icon: '📋' },
  { id: 'add', label: 'Adicionar Produto', icon: '➕' },
  { id: 'import', label: 'Importar CSV', icon: '📤' },
  { id: 'export', label: 'Exportar', icon: '📥' },
  { id: 'movements', label: 'Histórico', icon: '📊' },
  { id: 'alerts', label: 'Alertas', icon: '⚠️' },
];

interface AlertData {
  id: number;
  message: string;
  type: AlertType;
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('products');
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const showAlert = useCallback((message: string, type: AlertType) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeAlert = useCallback((id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as TabId);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsPage showAlert={showAlert} />;
      case 'add':
        return <AddProductPage showAlert={showAlert} />;
      case 'import':
        return <ImportPage showAlert={showAlert} />;
      case 'export':
        return <ExportPage showAlert={showAlert} />;
      case 'movements':
        return <MovementsPage />;
      case 'alerts':
        return <AlertsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow-md mb-8">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary">📦 Sistema de Gestão de Estoque</h1>
          <p className="text-sm text-base-content/60 mt-1">MVP - Controle completo do seu inventário</p>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        <Dashboard />

        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange}>
          {renderTabContent()}
        </Tabs>
      </div>

      <AlertContainer alerts={alerts} onRemove={removeAlert} />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

