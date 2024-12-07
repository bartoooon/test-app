import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-modal',
  standalone: false,

  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss',
})
export class DetailModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string; description: string; price: number },
    private dialogRef: MatDialogRef<DetailModalComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
