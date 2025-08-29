import { Component, Input } from '@angular/core';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-inputs',
  templateUrl: './all-inputs.component.html',
  styleUrls: ['./all-inputs.component.scss']
})
export class AllInputsComponent {
  @Input() mostrarHeader: boolean = true;
  hide = signal(true);

  constructor(private router: Router) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  verCodigoInput() {
    this.router.navigate(['inputs/code-input'], { queryParams: { from: this.router.url } });
  }

  verCodigofecha() {
    this.router.navigate(['inputs/code-input-date'], { queryParams: { from: this.router.url } });
  }
  
  verCodigoBuscar() {
    this.router.navigate(['inputs/code-input-search'], { queryParams: { from: this.router.url } });
  }

  verCodigoPassword() {
    this.router.navigate(['inputs/code-input-password'], { queryParams: { from: this.router.url } });
  }

  verCodigoSelect() {
    this.router.navigate(['inputs/code-input-select'], { queryParams: { from: this.router.url } });
  }
} 
