import { useState, useEffect, useCallback } from 'react';
import { Product, Movement, ProductFormData } from '../types';
import { ProductService } from '../services/products';
import { MovementService } from '../services/movements';
import { loadProducts, loadMovements, saveAll } from '../services/storage';

export function useInventory() {
  const [productService] = useState(() => {
    const { products, nextId } = loadProducts();
    return new ProductService(products, nextId);
  });

  const [movementService] = useState(() => {
    const { movements, nextMovementId } = loadMovements();
    return new MovementService(movements, nextMovementId);
  });

  const [products, setProducts] = useState<Product[]>(productService.getAll());
  const [movements, setMovements] = useState<Movement[]>(movementService.getAll());

  const saveToStorage = useCallback(() => {
    const productState = productService.getState();
    const movementState = movementService.getState();
    saveAll(
      productState.products,
      productState.nextId,
      movementState.movements,
      movementState.nextId
    );
  }, [productService, movementService]);

  const addProduct = useCallback(
    (productData: ProductFormData) => {
      const newProduct = productService.add(productData, (movement) => {
        const addedMovement = movementService.add(movement);
        setMovements(movementService.getAll());
        return addedMovement;
      });
      setProducts(productService.getAll());
      saveToStorage();
      return newProduct;
    },
    [productService, movementService, saveToStorage]
  );

  const updateProduct = useCallback(
    (id: number, updatedData: Partial<ProductFormData> & { movementReason?: string }) => {
      const updated = productService.update(id, updatedData, (movement) => {
        const addedMovement = movementService.add(movement);
        setMovements(movementService.getAll());
        return addedMovement;
      });
      if (updated) {
        setProducts(productService.getAll());
        saveToStorage();
      }
      return updated;
    },
    [productService, movementService, saveToStorage]
  );

  const deleteProduct = useCallback(
    (id: number) => {
      const deleted = productService.delete(id);
      if (deleted) {
        setProducts(productService.getAll());
        saveToStorage();
      }
      return deleted;
    },
    [productService, saveToStorage]
  );

  const getProductsNeedingRestock = useCallback(() => {
    return productService.getNeedingRestock();
  }, [productService]);

  return {
    products,
    movements,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsNeedingRestock,
  };
}

