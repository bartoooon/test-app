import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: false,

  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  loader$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.loader$ = this.loaderService.loader$; // Assegna dopo l'inizializzazione del servizio
  }
}
