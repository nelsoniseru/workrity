export interface ProductData {
    id?: string;
    name: string;
    price: number;
    stock: number;
  }
  
  export class Product {
    id?: string;
    name: string;
    price: number;
    stock: number;
  
    constructor({ id, name, price, stock }: ProductData) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.stock = stock;
    }
  
  
  }