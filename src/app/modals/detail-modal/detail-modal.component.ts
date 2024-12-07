import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../products/products.service';

@Component({
  selector: 'app-detail-modal',
  standalone: false,

  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss',
})
export class DetailModalComponent implements OnInit {
  isEditable = false; // Inizialmente i campi sono disabilitati
  data: any; // Per contenere i dati del prodotto

  constructor(
    public dialogRef: MatDialogRef<DetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: any
  ) {
    this.data = { ...productData }; // Imposta i dati iniziali
  }

  ngOnInit(): void {}

  // Funzione per alternare lo stato di modifica
  toggleEdit(): void {
    if (this.isEditable) {
      // Logica per salvare le modifiche (se necessario)
    }
    this.isEditable = !this.isEditable;
  }

  // Funzione per chiudere la modale
  close(): void {
    this.dialogRef.close();
  }
}
