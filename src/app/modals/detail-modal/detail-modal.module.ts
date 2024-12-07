import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailModalComponent } from './detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list'; // Importa MatGridListModule

@NgModule({
  declarations: [DetailModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
  ],
  exports: [DetailModalComponent],
})
export class DetailModalModule {}
