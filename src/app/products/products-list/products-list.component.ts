import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductResponse, ProductsService } from '../products.service';
import { LoaderService } from '../../components/loader/loader.service';
import { finalize } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailModalComponent } from '../../modals/detail-modal/detail-modal.component';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
@Component({
  selector: 'app-products-list',
  standalone: false,

  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit {
  displayedColumnsWithoutActions: string[] = [
    'title',
    'availabilityStatus',
    'brand',
    'rating',
    'category',
    'tags',
  ];
  displayedColumns: string[] = [
    'title',
    'availabilityStatus',
    'brand',
    'rating',
    'category',
    'tags',
    'price',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();
  limit = 10; // Numero di prodotti da caricare per ogni richiesta
  skip = 0; // Numero di prodotti già caricati
  isLoading = false; // Per evitare richieste multiple contemporanee

  constructor(
    private productsService: ProductsService,
    private loaderService: LoaderService,
    private dialog: MatDialog
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
        (response: ProductResponse) => {
          this.dataSource.data = [
            ...this.dataSource.data,
            ...response.products,
          ];
          this.skip += this.limit; // Incrementa il numero di prodotti caricati
        },
        (error: Error) => {
          console.error('Error loading products', error);
        }
      );
  }

  createProduct(): void {
    const dialogRef: MatDialogRef<DetailModalComponent> = this.dialog.open(
      DetailModalComponent,
      {
        width: '500px',
        data: { product: null, isEditable: true },
      }
    );

    dialogRef.afterClosed().subscribe((newProduct: Product) => {
      if (newProduct) {
        this.onProductCreated(newProduct);
      }
    });
  }

  onProductCreated(newProduct: Product): void {
    this.dataSource.data.unshift(newProduct); // Aggiungi il nuovo prodotto all'inizio della lista
    this.dataSource._updateChangeSubscription(); // Forza il refresh della tabella
  }

  openProduct(product: Product): void {
    const dialogRef: MatDialogRef<DetailModalComponent> = this.dialog.open(
      DetailModalComponent,
      {
        width: '500px',
        data: { product: product },
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.onProductUpdated(result);
      }
    });
  }
  // Funzione per ricevere i dati aggiornati dalla modale
  onProductUpdated(updatedProduct: Product): void {
    const index = this.dataSource.data.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      this.dataSource.data[index] = updatedProduct; // Aggiorna il prodotto nella lista
      this.dataSource._updateChangeSubscription(); // Forza il refresh della tabella
    }
  }

  deleteProduct(product: Product) {
    const dialogRef: MatDialogRef<DeleteModalComponent> = this.dialog.open(
      DeleteModalComponent,
      {
        width: '500px',
        data: { product: product },
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.onProductDeleted(result);
      }
    });
  }

  onProductDeleted(deletedProduct: Product): void {
    const index = this.dataSource.data.findIndex(
      (product) => product.id === deletedProduct.id
    );
    if (index !== -1) {
      // Rimuove il prodotto dalla lista
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Forza il refresh della tabella
    }
  }

  // Metodo per rilevare lo scroll e caricare altri prodotti quando la pagina viene scrollata
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
