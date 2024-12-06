import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ModalContainerComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ModalContainerComponent],
})
export class ModalContainerModule {}
