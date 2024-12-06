import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    MatTableModule,
    // BrowserAnimationsModule,
  ],
})
export class ProductsModule {}
