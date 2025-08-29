import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CodeExampleService } from 'src/app/core/services/code-example.service';
import { CodeExample } from 'src/app/core/models/code-example.model';

@Component({
  selector: 'app-code-alert-warning',
  templateUrl: './code-alert-warning.component.html',
  styleUrls: ['./code-alert-warning.component.scss']
})
export class CodeAlertWarningComponent {
  from: string = '';
  tabs: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private codeService: CodeExampleService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'] || '/';
    });
    // Consumir la API al inicializar
    this.codeService.getExample('code-alert-warning').subscribe(data => {
      this.tabs = [
        { label: 'HTML', code: data.html, language: 'html', icon: data.icons.html },
        { label: 'SCSS', code: data.scss, language: 'scss', icon: data.icons.scss }
      ];
      this.tabs = [...this.tabs];
      this.cdr.detectChanges();
    });
  }

  volver() {
    if (this.from === '/' || this.from === '') {
      this.router.navigate(['']); // all
    } else if (this.from.includes('botones')) {
      this.router.navigate(['botones']);
    } else if (this.from.includes('colores')) {
      this.router.navigate(['colores']);
    } else if (this.from.includes('alertas')) {
      this.router.navigate(['alertas']);
    } else if (this.from.includes('tablas')) {
      this.router.navigate(['tablas']);
    } else if (this.from.includes('inputs')) {
      this.router.navigate(['inputs']);
    } else if (this.from.includes('icons')) {
      this.router.navigate(['icons']);
    } else if (this.from.includes('loader')) {
      this.router.navigate(['loader']);
    } else if (this.from.includes('cards')) {
      this.router.navigate(['cards']);
    } else if (this.from.includes('extras')) {
      this.router.navigate(['extras']);
    } else if (this.from.includes('typography')) {
      this.router.navigate(['typography']);
    } else if (this.from.includes('images')) {
      this.router.navigate(['images']);
    } else {
      this.router.navigate(['']); // fallback
    }
  }
}
