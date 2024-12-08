import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

export interface Review {
  rating?: number;
  comment?: string;
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface Dimensions {
  width?: number;
  height?: number;
  depth?: number;
}

export interface Meta {
  createdAt?: string;
  updatedAt?: string;
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

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(limit: number, skip: number): Observable<ProductResponse> {
    return new Observable<ProductResponse>((observer) => {
      this.http
        .get<ProductResponse>(`${this.baseUrl}?limit=${limit}&skip=${skip}`)
        .subscribe({
          next: (response) => {
            // this.showSuccess('Prodotti caricati con successo!');
            observer.next(response);
            observer.complete();
          },
          error: (err) => {
            this.authService.showError(
              'Errore durante il caricamento dei prodotti.'
            );
            observer.error(err);
          },
        });
    });
  }

  addProduct(newProduct: Product): Observable<any> {
    return new Observable<any>((observer) => {
      this.http.post(`${this.baseUrl}/add`, newProduct).subscribe({
        next: (response) => {
          this.authService.showSuccess('Prodotto aggiunto con successo!');
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          this.authService.showError("Errore durante l'aggiunta del prodotto.");
          observer.error(err);
        },
      });
    });
  }

  updateProduct(id: number, updatedData: Product): Observable<any> {
    return new Observable<any>((observer) => {
      this.http.put(`${this.baseUrl}/${id}`, updatedData).subscribe({
        next: (response) => {
          this.authService.showSuccess('Prodotto aggiornato con successo!');
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          this.authService.showError(
            "Errore durante l'aggiornamento del prodotto."
          );
          observer.error(err);
        },
      });
    });
  }

  deleteProduct(productId: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.http.delete(`${this.baseUrl}/${productId}`).subscribe({
        next: (response) => {
          this.authService.showSuccess('Prodotto eliminato con successo!');
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          this.authService.showError(
            "Errore durante l'eliminazione del prodotto."
          );
          observer.error(err);
        },
      });
    });
  }
}
