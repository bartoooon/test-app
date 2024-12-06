import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [ModalContainerComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIcon],
  exports: [ModalContainerComponent],
})
export class ModalContainerModule {}
