import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-alerts',
  templateUrl: './all-alerts.component.html',
  styleUrls: ['./all-alerts.component.scss']
})
export class AllAlertsComponent {
  @Input() mostrarHeader: boolean = true;

  constructor(private router: Router) {}

  verCodigoAlertaExitosa() {
    this.router.navigate(['alertas/code-alert-successful'], { queryParams: { from: this.router.url } });
  }

  verCodigoAlertaError() {
    this.router.navigate(['alertas/code-alert-error'], { queryParams: { from: this.router.url } });
  }

  verCodigoAlertaWarning() {
    this.router.navigate(['alertas/code-alert-warning'], { queryParams: { from: this.router.url } });
  }

  verCodigoAlertaInfo() {
    this.router.navigate(['alertas/code-alert-info'], { queryParams: { from: this.router.url } });
  }
} 