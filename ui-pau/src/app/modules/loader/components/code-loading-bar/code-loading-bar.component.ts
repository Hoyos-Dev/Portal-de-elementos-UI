import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CodeExample } from 'src/app/core/models/code-example.model';
import { CodeExampleService } from 'src/app/core/services/code-example.service';

@Component({
  selector: 'app-code-loading-bar',
  templateUrl: './code-loading-bar.component.html',
  styleUrls: ['./code-loading-bar.component.scss']
})
export class CodeLoadingBarComponent {
  from: string = '';
  tabs: any[] = [];
  private progressInterval: any;
  progressValue = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private codeService: CodeExampleService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'] || '';
    });
    // Consumir la API al inicializar
    this.codeService.getExample('code-loading-bar').subscribe(data => {
      this.tabs = [
        { label: 'HTML', code: data.html, language: 'html', icon: data.icons.html },
        { label: 'TS', code: data.ts, language: 'typescript', icon: data.icons.ts }
      ];
      this.tabs = [...this.tabs];
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.startProgressBar();
  }

  startProgressBar() {
    this.progressInterval = setInterval(() => {
      this.progressValue += 10;
      if (this.progressValue > 100) {
        this.progressValue = 0;
      }
    }, 800);
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  volver() {
    if (this.from === '/' || this.from === '') {
      this.router.navigate(['']);
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
      this.router.navigate(['']);
    }
  }
}
