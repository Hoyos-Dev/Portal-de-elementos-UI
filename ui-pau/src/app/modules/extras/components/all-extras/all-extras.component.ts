import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-extras',
  templateUrl: './all-extras.component.html',
  styleUrls: ['./all-extras.component.scss']
})
export class AllExtrasComponent {
  @Input() mostrarHeader: boolean = true;

  constructor(private router: Router) {}

  verCodigoHeader() {
    this.router.navigate(['extras/code-header'], { queryParams: { from: this.router.url } });
  }

  verCodigoTooltips() {
    this.router.navigate(['extras/code-tooltips'], { queryParams: { from: this.router.url } });
  }

  verCodigoTabs() {
    this.router.navigate(['extras/code-tabs'], { queryParams: { from: this.router.url } });
  }
} 