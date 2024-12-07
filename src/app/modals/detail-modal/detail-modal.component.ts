import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product, ProductsService } from '../../products/products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-detail-modal',
  standalone: false,
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent implements OnInit {
  @Output() productUpdated = new EventEmitter<any>(); // Evento per notificare il padre

  isEditable: boolean = false; // Inizialmente i campi sono disabilitati
  product: Product; // Per contenere i dati del prodotto
  availabilityStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    private authService: AuthService
  ) {
    this.product = { ...data.product }; // Imposta i dati iniziali
    this.isEditable = data.isEditable; // Imposta i dati iniziali
  }

  ngOnInit(): void {}

  // Funzione per alternare lo stato di modifica
  toggleEdit(): void {
    if (this.isEditable) {
      // Logica per salvare le modifiche (simulazione della POST)
      if (
        !this.product.title ||
        !this.product.price ||
        !this.product.availabilityStatus
      ) {
        // Se i campi non sono compilati, mostra uno snackBar
        this.authService.showError('Per favore, compila tutti i campi.');
        return;
      }
      !this.data.id ? this.addNewProduct() : this.updateProductTitle();
    }
    this.isEditable = !this.isEditable;
  }

  addNewProduct(): void {
    const newProduct: any = {
      title: this.product.title,
      price: this.product.price,
      category: this.product.category,
      brand: this.product.brand,
      rating: this.product.rating,
      availabilityStatus: this.product.availabilityStatus,
      tags: this.product.tags,
    };
    if (Object.keys(newProduct).length > 0) {
      this.productsService.addProduct(newProduct).subscribe((response) => {
        console.log('Product added successfully:', response);
        this.productUpdated.emit(this.product); // Notifica al componente padre dell'aggiornamento
        this.dialogRef.close(this.product); // Chiudi la modale dopo l'aggiornamento      },
        (error: any) => {
          console.error('Error adding product:', error);
        };
      });
    } else {
      console.log('No changes to update.');
    }
  }

  updateProductTitle(): void {
    const updatedData: any = {
      title: this.product.title,
      price: this.product.price,
      category: this.product.category,
      brand: this.product.brand,
      rating: this.product.rating,
      availabilityStatus: this.product.availabilityStatus,
      tags: this.product.tags,
    };
    if (Object.keys(updatedData).length > 0) {
      // Se ci sono modifiche, chiama il servizio per aggiornare il prodotto
      this.productsService
        .updateProduct(this.product.id, updatedData)
        .subscribe(
          (response) => {
            console.log('Product updated:', response);
            this.productUpdated.emit(this.product); // Notifica al componente padre dell'aggiornamento
            this.dialogRef.close(this.product); // Chiudi la modale dopo l'aggiornamento
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
    } else {
      console.log('No changes to update.');
    }
  }

  // Funzione per chiudere la modale
  close(data?: any): void {
    this.dialogRef.close(data);
  }
}
