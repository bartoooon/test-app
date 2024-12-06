import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../products.service';
import { LoaderService } from '../../loader/loader.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-products-list',
  standalone: false,

  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  limit = 10; // Numero di prodotti da caricare per ogni richiesta
  skip = 0; // Numero di prodotti già caricati
  isLoading = false; // Per evitare richieste multiple contemporanee

  constructor(
    private productsService: ProductsService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.isLoading) return; // Previeni richieste multiple
    this.isLoading = true;
    this.loaderService.show(); // Mostra il loader

    this.productsService
      .getProducts(this.limit, this.skip)
      .pipe(
        finalize(() => {
          this.loaderService.hide(); // Nascondi il loader una volta completato
          this.isLoading = false; // Rimuovi il flag di caricamento
        })
      )
      .subscribe(
        (response) => {
          this.dataSource.data = [
            ...this.dataSource.data,
            ...response.products,
          ];
          this.skip += this.limit; // Incrementa il numero di prodotti caricati
        },
        (error) => {
          console.error('Error loading products', error);
        }
      );
  }

  editProduct(row: any) {}

  deleteProduct(row: any) {}

  // Metodo per rilevare lo scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isLoading) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThreshold = document.body.offsetHeight - 200; // 200px prima della fine

    if (scrollPosition >= scrollThreshold) {
      this.loadProducts();
    }
  }
}
