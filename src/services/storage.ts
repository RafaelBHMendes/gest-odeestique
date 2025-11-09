import { Product, Movement } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'inventoryProducts',
  NEXT_ID: 'inventoryNextId',
  MOVEMENTS: 'inventoryMovements',
  NEXT_MOVEMENT_ID: 'inventoryNextMovementId',
} as const;

export function saveProducts(products: Product[], nextId: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.NEXT_ID, nextId.toString());
  } catch (error) {
    console.error('Erro ao salvar produtos no localStorage:', error);
  }
}

export function loadProducts(): { products: Product[]; nextId: number } {
  try {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const savedNextId = localStorage.getItem(STORAGE_KEYS.NEXT_ID);

    return {
      products: savedProducts ? JSON.parse(savedProducts) : [],
      nextId: savedNextId ? parseInt(savedNextId, 10) : 1,
    };
  } catch (error) {
    console.error('Erro ao carregar produtos do localStorage:', error);
    return { products: [], nextId: 1 };
  }
}

export function saveMovements(movements: Movement[], nextMovementId: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));
    localStorage.setItem(STORAGE_KEYS.NEXT_MOVEMENT_ID, nextMovementId.toString());
  } catch (error) {
    console.error('Erro ao salvar movimentações no localStorage:', error);
  }
}

export function loadMovements(): { movements: Movement[]; nextMovementId: number } {
  try {
    const savedMovements = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
    const savedNextMovementId = localStorage.getItem(STORAGE_KEYS.NEXT_MOVEMENT_ID);

    return {
      movements: savedMovements ? JSON.parse(savedMovements) : [],
      nextMovementId: savedNextMovementId ? parseInt(savedNextMovementId, 10) : 1,
    };
  } catch (error) {
    console.error('Erro ao carregar movimentações do localStorage:', error);
    return { movements: [], nextMovementId: 1 };
  }
}

export function saveAll(
  products: Product[],
  nextId: number,
  movements: Movement[],
  nextMovementId: number
): void {
  saveProducts(products, nextId);
  saveMovements(movements, nextMovementId);
}

