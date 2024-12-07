import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [DeleteModalComponent],
  imports: [CommonModule, MatDialogModule, MatIcon, MatButtonModule],
  exports: [DeleteModalComponent],
})
export class DeleteModalModule {}
