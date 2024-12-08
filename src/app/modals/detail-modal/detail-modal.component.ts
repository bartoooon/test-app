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
  @Output() productUpdated = new EventEmitter<any>();

  isEditable: boolean = false;
  product: Product;
  availabilityStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    private authService: AuthService
  ) {
    this.product = { ...data.product };
    this.isEditable = data.isEditable;
  }

  ngOnInit(): void {}

  toggleEdit(): void {
    if (this.isEditable) {
      if (
        !this.product.title ||
        !this.product.price ||
        !this.product.availabilityStatus
      ) {
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
        this.productUpdated.emit(this.product);
        this.dialogRef.close(this.product);
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
      this.productsService
        .updateProduct(this.product.id, updatedData)
        .subscribe(
          (response) => {
            console.log('Product updated:', response);
            this.productUpdated.emit(this.product);
            this.dialogRef.close(this.product);
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
    } else {
      console.log('No changes to update.');
    }
  }

  close(data?: any): void {
    this.dialogRef.close(data);
  }
}
