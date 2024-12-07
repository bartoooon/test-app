import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-available-chip',
  standalone: false,

  templateUrl: './available-chip.component.html',
  styleUrl: './available-chip.component.scss',
})
export class AvailableChipComponent {
  @Input() availability: string = '';

  getAvailabilityClass(): string {
    switch (this.availability) {
      case 'In Stock':
        return 'chip-in-stock';
      case 'Low Stock':
        return 'chip-low-stock';
      case 'Out of Stock':
        return 'chip-out-of-stock';
      default:
        return '';
    }
  }
}
