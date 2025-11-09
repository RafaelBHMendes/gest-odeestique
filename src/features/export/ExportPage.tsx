import { useInventory } from '../../hooks/useInventory';
import { exportToCSV, exportToJSON } from '../../services/csv';
import { downloadFile } from '../../lib/utils';

interface ExportPageProps {
  showAlert: (message: string, type: 'success' | 'error') => void;
}

export function ExportPage({ showAlert }: ExportPageProps) {
  const { products } = useInventory();

  const handleExportCSV = () => {
    if (products.length === 0) {
      showAlert('Não há produtos para exportar.', 'error');
      return;
    }

    try {
      const csvContent = exportToCSV(products);
      downloadFile(csvContent, 'inventario.csv', 'text/csv');
      showAlert('Arquivo CSV exportado com sucesso!', 'success');
    } catch (error) {
      showAlert('Erro ao exportar CSV.', 'error');
    }
  };

  const handleExportJSON = () => {
    if (products.length === 0) {
      showAlert('Não há produtos para exportar.', 'error');
      return;
    }

    try {
      const jsonContent = exportToJSON(products);
      downloadFile(jsonContent, 'inventario.json', 'application/json');
      showAlert('Arquivo JSON exportado com sucesso!', 'success');
    } catch (error) {
      showAlert('Erro ao exportar JSON.', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Exportar Dados</h2>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <p className="mb-6 text-base-content/70">
            Exporte seus produtos para um arquivo CSV que pode ser aberto no Excel ou outras
            ferramentas.
          </p>

          <div className="flex gap-3 mb-8">
            <button className="btn btn-success" onClick={handleExportCSV}>
              📥 Exportar para CSV
            </button>
            <button className="btn btn-ghost" onClick={handleExportJSON}>
              📋 Exportar para JSON
            </button>
          </div>

          <div className="p-5 bg-base-200 rounded-lg">
            <h4 className="font-semibold mb-3">ℹ️ Sobre a exportação:</h4>
            <ul className="list-disc list-inside space-y-2 text-base-content/70">
              <li>O arquivo CSV pode ser importado novamente neste sistema</li>
              <li>Compatível com Excel, Google Sheets e outras ferramentas</li>
              <li>O arquivo JSON é útil para backup ou integração com APIs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

