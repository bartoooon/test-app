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

@Component({
  selector: 'app-detail-modal',
  standalone: false,
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent implements OnInit {
  @Output() productUpdated = new EventEmitter<any>(); // Evento per notificare il padre

  @Input() isEditable = false; // Inizialmente i campi sono disabilitati
  product: any; // Per contenere i dati del prodotto
  availabilityStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService // Inietta il servizio
  ) {
    this.product = { ...data }; // Imposta i dati iniziali
  }

  ngOnInit(): void {
    console.log(this.product);
  }

  // Funzione per alternare lo stato di modifica
  toggleEdit(): void {
    if (this.isEditable) {
      // Logica per salvare le modifiche (simulazione della POST)
      this.updateProductTitle();
    }
    this.isEditable = !this.isEditable;
  }

  addNewProduct(): void {
    // this.productsService.addProduct(this.newProduct).subscribe(
    //   (response) => {
    //     console.log('Product added successfully:', response);
    //     // Puoi fare qualcosa con la risposta, come mostrare un messaggio di successo o reindirizzare l'utente
    //   },
    //   (error) => {
    //     console.error('Error adding product:', error);
    //   }
    // );
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
