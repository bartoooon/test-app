import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse, ProductsService } from '../products.service';
import { LoaderService } from '../../components/loader/loader.service';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DetailModalComponent } from '../../modals/detail-modal/detail-modal.component';
@Component({
  selector: 'app-products-list',
  standalone: false,

  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
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

  editProduct(product: any) {
    this.dialog.open(DetailModalComponent, {
      // width: '400px',
      data: product,
    });
  }

  deleteProduct(row: any) {
    // this.dialog.open(ModalContainerComponent, {
    //   width: '500px',
    //   data: {
    //     title: 'Modale con Componente Dinamico',
    //     // component: DynamicContentComponent, // Passa il componente dinamico
    //     inputs: {
    //       message: 'Ciao dal Modale!', // Passa i dati al componente
    //     },
    //   },
    // });
  }

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
