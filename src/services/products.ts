import { Product, ProductFormData, Movement } from '../types';
import { generateSKU } from '../lib/utils';

export class ProductService {
  private products: Product[] = [];
  private nextId: number = 1;

  constructor(initialProducts: Product[] = [], initialNextId: number = 1) {
    this.products = initialProducts;
    this.nextId = initialNextId;
  }

  getAll(): Product[] {
    return [...this.products];
  }

  getById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  add(productData: ProductFormData, onMovementAdded?: (movement: Movement) => void): Product {
    const newProduct: Product = {
      id: this.nextId++,
      name: productData.name,
      category: productData.category,
      price: parseFloat(productData.price.toString()),
      stock: parseInt(productData.stock.toString(), 10),
      description: productData.description || '',
      createdAt: new Date().toISOString(),
      sku: productData.sku || generateSKU(),
      minStock: parseInt(productData.minStock.toString(), 10) || 10,
    };

    this.products.push(newProduct);

    // Registrar movimento de entrada inicial
    if (onMovementAdded) {
      const movement: Movement = {
        id: 0, // Será definido pelo MovementService
        productId: newProduct.id,
        productName: newProduct.name,
        type: 'entrada',
        quantity: newProduct.stock,
        reason: 'Cadastro inicial do produto',
        previousStock: 0,
        newStock: newProduct.stock,
        timestamp: new Date().toISOString(),
      };
      onMovementAdded(movement);
    }

    return newProduct;
  }

  update(
    id: number,
    updatedData: Partial<ProductFormData> & { movementReason?: string },
    onMovementAdded?: (movement: Movement) => void
  ): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const previousStock = this.products[index].stock;
    const newStock = updatedData.stock !== undefined 
      ? parseInt(updatedData.stock.toString(), 10) 
      : previousStock;

    this.products[index] = {
      ...this.products[index],
      ...updatedData,
      price: updatedData.price !== undefined 
        ? parseFloat(updatedData.price.toString()) 
        : this.products[index].price,
      stock: newStock,
      minStock: updatedData.minStock !== undefined 
        ? parseInt(updatedData.minStock.toString(), 10) 
        : this.products[index].minStock,
    };

    // Registrar movimento se houve alteração de estoque
    if (previousStock !== newStock && onMovementAdded) {
      const movementType = newStock > previousStock ? 'entrada' : 'saida';
      const quantity = Math.abs(newStock - previousStock);

      const movement: Movement = {
        id: 0, // Será definido pelo MovementService
        productId: id,
        productName: this.products[index].name,
        type: movementType,
        quantity: quantity,
        reason: updatedData.movementReason || 'Ajuste de estoque manual',
        previousStock: previousStock,
        newStock: newStock,
        timestamp: new Date().toISOString(),
      };
      onMovementAdded(movement);
    }

    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  getNeedingRestock(): Product[] {
    return this.products.filter((p) => p.stock <= p.minStock);
  }

  getState(): { products: Product[]; nextId: number } {
    return {
      products: this.products,
      nextId: this.nextId,
    };
  }

  setState(products: Product[], nextId: number): void {
    this.products = products;
    this.nextId = nextId;
  }
}

