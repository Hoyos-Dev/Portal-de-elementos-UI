import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent {
  @Input() mostrarHeader: boolean = true;

  constructor(private router: Router) {}

  verCodigoDetalles() {
    this.router.navigate(['cards/code-card-details']);
  }

  verCodigoDetalleImagen() {
    this.router.navigate(['cards/code-card-details-image']);
  }

} 