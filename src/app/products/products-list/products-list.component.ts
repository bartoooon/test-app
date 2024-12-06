import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-products-list',
  standalone: false,

  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'description'];
  dataSource = new MatTableDataSource<any>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(
      (response) => {
        this.dataSource.data = response.products;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }
}
