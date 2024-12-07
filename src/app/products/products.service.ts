import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  rating?: number;
  comment?: string;
  date?: string; // Data in formato stringa ISO 8601
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface Dimensions {
  width?: number;
  height?: number;
  depth?: number;
}

export interface Meta {
  createdAt?: string; // Data in formato stringa ISO 8601
  updatedAt?: string; // Data in formato stringa ISO 8601
  barcode?: string;
  qrCode?: string;
}

export interface Product {
  id: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  images?: string[];
  thumbnail?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number): Observable<ProductResponse> {
    return this.http.get<any>(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
  }

  addProduct(newProduct: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, newProduct);
  }

  // Funzione per aggiornare un prodotto (per esempio il titolo)
  updateProduct(id: number, updatedData: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedData);
  }
}
