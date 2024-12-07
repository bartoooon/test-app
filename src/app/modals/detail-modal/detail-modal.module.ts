import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailModalComponent } from './detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [DetailModalComponent],
  imports: [CommonModule, MatDialogModule, MatIcon],
  exports: [DetailModalComponent],
})
export class DetailModalModule {}
