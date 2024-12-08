import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Product, ProductsService } from '../../products/products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  standalone: false,

  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  @Output() productDeleted = new EventEmitter<any>();

  isEditable = false;
  product: any;
  availabilityStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService
  ) {
    this.product = { ...data.product };
  }
  close(data?: any): void {
    this.dialogRef.close(data);
  }

  confirm(data: Product) {
    this.productsService.deleteProduct(data.id).subscribe(
      (response) => {
        console.log('Prodotto eliminato con successo', response);
        this.productDeleted.emit(this.product);
        this.dialogRef.close(this.product);
      },
      (error) => {
        console.error("Errore durante l'eliminazione del prodotto", error);
      }
    );
  }
}
