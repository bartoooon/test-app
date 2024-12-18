import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AvailableChipModule } from '../components/available-chip/available-chip.module';
import { DetailModalModule } from '../modals/detail-modal/detail-modal.module';
import { DeleteModalModule } from '../modals/delete-modal/delete-modal.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIcon,
    MatChipsModule,
    AvailableChipModule,
    DetailModalModule,
    DeleteModalModule,
    // BrowserAnimationsModule,
  ],
})
export class ProductsModule {}
