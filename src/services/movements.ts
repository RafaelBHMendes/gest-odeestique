import { Movement } from '../types';

export class MovementService {
  private movements: Movement[] = [];
  private nextId: number = 1;

  constructor(initialMovements: Movement[] = [], initialNextId: number = 1) {
    this.movements = initialMovements;
    this.nextId = initialNextId;
  }

  add(movement: Omit<Movement, 'id' | 'timestamp'>): Movement {
    const newMovement: Movement = {
      ...movement,
      id: this.nextId++,
      timestamp: new Date().toISOString(),
    };
    this.movements.push(newMovement);
    return newMovement;
  }

  getAll(): Movement[] {
    return [...this.movements].reverse(); // Mais recentes primeiro
  }

  getByProductId(productId: number): Movement[] {
    return this.movements.filter((m) => m.productId === productId);
  }

  getState(): { movements: Movement[]; nextId: number } {
    return {
      movements: this.movements,
      nextId: this.nextId,
    };
  }

  setState(movements: Movement[], nextId: number): void {
    this.movements = movements;
    this.nextId = nextId;
  }
}

