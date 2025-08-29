import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-buttons',
  templateUrl: './all-buttons.component.html',
  styleUrls: ['./all-buttons.component.scss']
})
export class AllButtonsComponent {
  @Input() mostrarHeader: boolean = true;
  radioValue: string = 'opcion1';

  constructor(private router: Router) {}

  verCodigoPrimario() {
    this.router.navigate(['botones/code-primary'], { queryParams: { from: this.router.url } });
  }

  verCodigoSecundario() {
    this.router.navigate(['botones/code-secondary'], { queryParams: { from: this.router.url } });
  }

  verCodigoDesactivado() {
    this.router.navigate(['botones/code-disable'], { queryParams: { from: this.router.url } });
  }

  verCodigoExpandido() {
    this.router.navigate(['botones/code-expanded'], { queryParams: { from: this.router.url } });
  }

  verCodigoBotonMasIcono() {
    this.router.navigate(['botones/code-button-plus-icon'], { queryParams: { from: this.router.url } });
  }

  verCodigoRadioButton() {
    this.router.navigate(['botones/code-radio-button'], { queryParams: { from: this.router.url } });
  }
} 