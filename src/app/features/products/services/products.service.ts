import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '../../../app.config';
import { Product } from '../../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = apiConfig.apiBaseUrl;
  private httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${apiConfig.endpoints.products.products}`, this.httpOptions);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}${apiConfig.endpoints.products.products}`, product, this.httpOptions);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}${apiConfig.endpoints.products.products}/${id}`, product, this.httpOptions);
  }
}
