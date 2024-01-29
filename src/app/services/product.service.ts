import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  rootDirectory = 'https://localhost:7088/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(`${this.rootDirectory}/products`);
    }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put(`${this.rootDirectory}/products`, product)
    .pipe<Product>(map((data: any) => data.product));
};
  
   addProduct(product: Product):Observable<Product> {
    return this.http.post(`${this.rootDirectory}/products`, product)
    .pipe<Product>(map((data: any) => data.product));
  };    
  
  deleteProduct(productId: string){
    return this.http.delete(`${this.rootDirectory}/products/${productId}`)
    .pipe(map((data: any) => data.productId));
  }
  

  deleteProducts(productIds: string[]): Observable<string[]> {
    return forkJoin(
      productIds.map((id) =>
      this.http.delete(`${this.rootDirectory}/products/${id}`)
      .pipe(map((data: any) => data.ProductId)))
      );
    
  }
}
