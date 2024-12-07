import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableChipComponent } from './available-chip.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [AvailableChipComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [AvailableChipComponent],
})
export class AvailableChipModule {}
